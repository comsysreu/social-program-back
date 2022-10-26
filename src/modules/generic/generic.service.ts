import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mongoose, { Connection, Schema } from 'mongoose';
import moment = require('moment-timezone');
import { QuerysList } from 'src/utils/querys';
import { CommonUtils } from 'src/utils/common.utils';
import { createHmac } from 'crypto';

@Injectable()
export class GenericService {
  entitySchema = new Schema({}, { strict: false, versionKey: false });

  constructor(
    @Inject('DB_CONN')
    private readonly connection: Connection,
  ) {
    this.entitySchema.set('toObject', { virtuals: true });
  }

  async create(entity: string, payload: any, tok: string, validField: string) {
    const dbModel = this.getConnection(entity);
    console.log(tok);

    if (validField) {
      await this.reviewData(payload, validField, dbModel, 'new');
    }

    this.entitySchema.add({ key: mongoose.Schema.Types.Mixed });

    payload = this.setDates(payload, 'new');
    payload = this.setAuthor(payload, 'new', tok);
    payload.statusD = 1;

    const logIn = this.prepareLog(
      'POST',
      null,
      payload,
      `Entidad ${entity} Creada`,
      tok,
      entity,
    );

    await this.createLog(this.getDataTok(tok), logIn);

    return dbModel.create(payload).catch((err) => {
      throw err;
    });
  }

  async reviewData(
    payload,
    validField,
    dbModel,
    type: string,
  ): Promise<any | null> {
    if (!payload.hasOwnProperty(validField)) {
      throw new HttpException(
        `El campo ${validField} no existe en el cuerpo de la peticion`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const query = { [validField]: payload[validField], statusD: 1 };

      console.log(query);

      const findResults = await dbModel.find(query).catch((err) => {
        throw err;
      });

      console.log(findResults);
      if (findResults.length > 0) {
        if (type === 'new') {
          throw new HttpException(
            `Ya existe un registro con el valor ${payload[validField]} en el campo ${validField}`,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          if (String(payload._id) === String(findResults[0]._id)) {
            return findResults[0];
          } else {
            throw new HttpException(
              `No se puede actualizar el registro porque ya existe uno con el mismo valor en el campo ${validField}`,
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }
    }
  }

  async findAll(
    entity: string,
    page: number,
    limit: number,
    filter: any,
    sort: any,
    sortDirection: number,
    onlyCount: boolean,
  ): Promise<any | null> {
    if (onlyCount)
      return {
        count: await this.getCounts(
          entity,
          await this.buildQueryAgregate(filter, sort, sortDirection, entity),
        ),
      };
    return this.paginationEntity(
      page,
      limit,
      entity,
      filter,
      sort,
      sortDirection,
    );
  }

  async findOne(id: string, entity: string) {
    const dbModel = this.getConnection(entity);

    const entityFound = await dbModel.findById(id).catch((err) => {
      if (err.name === 'CastError') {
        err.status = 404;
      }
      throw err;
    });

    if (!entityFound || entityFound._doc.statusD === 0)
      throw new HttpException('Entity Not Found', 404);

    return entityFound;
  }

  async findByQuery(entity: string, query: Array<any>): Promise<any | null> {
    const dbModel = this.getConnection(entity);

    console.log(JSON.stringify(query));

    return dbModel
      .aggregate(query)
      .exec()
      .catch((ex) => {
        if (ex.name === 'CastError') {
          ex.status = 404;
        }
        throw ex;
      });
  }

  async update(entity: string, payload: any, tok: string, validField: string) {
    const dbModel = this.getConnection(entity);

    let entityToUpdate;

    if (validField) {
      entityToUpdate = await this.reviewData(
        payload,
        validField,
        dbModel,
        'update',
      );
    } else {
      entityToUpdate = await this.findOne(payload._id, entity);
    }

    console.log('entityToUpdate: ', entityToUpdate, validField);

    // rollback createAt in METHOD UPDATE payload.createAt = entityToUpdate.toObject())['createAt'];
    payload.createAt = entityToUpdate['createAt'];
    payload.updateAt = this.setDates(payload, '');
    payload = this.setAuthor(payload, '', tok);

    const updatedEntity = await dbModel
      .updateOne({ _id: payload._id }, payload)
      .catch((error) => {
        throw error;
      });

    const log = this.prepareLog(
      'PUT',
      entityToUpdate,
      payload,
      `Entidad ${entity} Actualizada`,
      tok,
      entity,
    );

    await this.createLog(this.getDataTok(tok), log);

    return updatedEntity;
  }

  async remove(id: string, tok: string, entity: string, permanenty: boolean) {
    const dbModel = this.getConnection(entity);

    const entityToDelete = await this.findOne(id, entity);

    const log = this.prepareLog(
      'DELETE',
      entityToDelete,
      null,
      `Entidad ${entity} Eliminada`,
      tok,
      entity,
    );

    await this.createLog(this.getDataTok(tok), log);

    if (permanenty) {
      return dbModel
        .findByIdAndRemove(id)
        .exec()
        .catch((er) => {
          if (er.name === 'CastError') {
            er.status = 404;
          }
          throw er;
        });
    } else {
      entityToDelete._doc.statusD = 0;
      entityToDelete._doc.updateAt = this.setDates(entityToDelete, '');

      return dbModel
        .updateOne({ _id: entityToDelete._id }, entityToDelete)
        .catch((error) => {
          throw error;
        });
    }
  }

  public getConnection(entity: string) {
    let dbModel;
    try {
      dbModel = this.connection.model(entity);
    } catch (error) {
      dbModel = this.connection.model(entity, this.entitySchema);
    }
    return dbModel;
  }

  public setDates(payload: any, type: string) {
    const now = moment.tz(new Date(), 'America/Guatemala');

    if (type === 'new') {
      this.entitySchema.add({ createAt: mongoose.Schema.Types.Mixed });
      this.entitySchema.add({ updateAt: mongoose.Schema.Types.Mixed });
      payload.createAt = now.utc(true).toDate();
      payload.updateAt = now.utc(true).toDate();
    } else {
      return now.utc(true).toDate();
    }

    return payload;
  }

  public setAuthor(payload: any, type: string, tok: string) {
    const valuesTok = this.getDataTok(tok);

    if (type === 'new') {
      this.entitySchema.add({ createBy: mongoose.Schema.Types.Mixed });
      this.entitySchema.add({ updateBy: mongoose.Schema.Types.Mixed });
      payload.createBy = valuesTok.name;
      payload.updateBy = valuesTok.name;
    } else {
      payload.updateBy = valuesTok.name;
    }

    return payload;
  }

  getDataTok(tok) {
    const _id = CommonUtils.getValuesTok(tok, '_id');
    const name = CommonUtils.getValuesTok(tok, 'username');
    return { _id, name };
  }

  prepareLog(
    method: string,
    entityOld: any,
    entityNew: any,
    label: string,
    token: string,
    entityName: string,
  ) {
    const log: any = {};
    log.method = method;
    log.entityOld = JSON.stringify(entityOld);
    log.entityNew = JSON.stringify(entityNew);
    log.actionLabel = label;
    log.token = token;
    const now = moment.tz(new Date(), 'America/Guatemala');
    log.createAt = now.utc(true).toDate();
    log.entity = entityName;
    return log;
  }

  async createLog(user: any, log: any): Promise<any | null> {
    log.createdById = user._id;
    log.createdBy = user.name;

    const dbModel = this.getConnection('entity-logs');

    return dbModel.create(log).catch((err) => {
      throw err;
    });
  }

  async paginationEntity(
    pageC: number,
    limitC: number,
    entity: string,
    filter: any,
    sortField: any,
    sortDirection: any,
  ) {
    const { page = 1, limit = 10 } = { page: pageC, limit: limitC };

    let query = [];

    if (filter) {
      query = await this.buildQueryAgregate(
        filter,
        sortField,
        sortDirection,
        entity,
      );
    } else {
      query = await this.buildQuerySample(entity, sortField, sortDirection);
    }

    console.log('END QUERY ========>', JSON.stringify(query));
    const dbModel = this.getConnection(entity);

    const entityList = await dbModel
      .aggregate(query)
      .limit(limit * page)
      .skip((page - 1) * limit)
      .catch((err) => {
        throw err;
      });

    const count = await this.getCounts(entity, query);

    return {
      entityList,
      totalPages: Math.ceil(count / limit),
      totalRegister: count,
      currentPage: page,
    };
  }

  async buildQueryAgregate(
    filter,
    sortField,
    sortDirection,
    entity: string,
  ): Promise<any[]> {
    let sort = {};
    let search = {};
    const status = {
      $match: {
        statusD: 1,
      },
    };
    let query = [];
    query.push(status);

    console.log('filter ==> ', filter);

    if (filter) {
      if (entity === 'users') {
        query = [
          ...QuerysList.USERS,
          {
            $match: {
              $or: [
                { name: new RegExp(filter, 'i') },
                { lastName: new RegExp(filter, 'i') },
                { username: new RegExp(filter, 'i') },
                { 'profile.name': new RegExp(filter, 'i') },
              ],
            },
          },
        ];
      } else if (entity === 'profile_permissions') {
        query = [
          {
            $match: {
              $and: [
                {
                  profileId: Number(filter),
                },
              ],
            },
          },
        ];
      } else if (entity === 'groceries') {
        query = [
          {
            $match: {
              $or: [
                { fullName: new RegExp(filter, 'i') },
                { dpi: new RegExp(filter, 'i') },
                { community: new RegExp(filter, 'i') },
              ],
            },
          },
          {
            $lookup: {
              from: 'history-groceries',
              localField: 'dpi',
              foreignField: 'dpi',
              as: 'history',
            },
          },
        ];
      } else if (entity === 'medicine') {
        query = [
          {
            $match: {
              $or: [
                { fullName: new RegExp(filter, 'i') },
                { dpi: new RegExp(filter, 'i') },
                { community: new RegExp(filter, 'i') },
              ],
            },
          },
          {
            $lookup: {
              from: 'history-medicines',
              localField: 'dpi',
              foreignField: 'dpi',
              as: 'history',
            },
          },
        ];
      } else if (entity === 'ceiling') {
        query = [
          {
            $match: {
              $or: [
                { fullName: new RegExp(filter, 'i') },
                { dpi: new RegExp(filter, 'i') },
                { community: new RegExp(filter, 'i') },
              ],
            },
          },
          {
            $lookup: {
              from: 'history-ceilings',
              localField: 'dpi',
              foreignField: 'dpi',
              as: 'history',
            },
          },
        ];
      } else {
        search = { $match: { name: new RegExp(filter, 'i') } };
        query.push(search);
      }
    }

    if (sortField) {
      sort = {
        $sort: {
          [sortField]: sortDirection ? parseInt(sortDirection) : 1,
        },
      };
    } else {
      sort = { $sort: { name: 1 } };
    }

    query.push(sort);

    return query;
  }

  async buildQuerySample(entity, sortField, sortDirection) {
    let sort = {};

    if (sortField) {
      sort = {
        $sort: {
          [sortField]: sortDirection ? parseInt(sortDirection) : 1,
        },
      };
    } else {
      sort = { $sort: { name: 1 } };
    }

    if (entity === 'users') {
      return [...QuerysList.USERS, sort];
    } else if (entity === 'groceries') {
      return [
        {
          $lookup: {
            from: 'history-groceries',
            localField: 'dpi',
            foreignField: 'dpi',
            as: 'history',
          },
        },
        sort,
      ];
    } else if (entity === 'medicine') {
      return [
        {
          $lookup: {
            from: 'history-medicines',
            localField: 'dpi',
            foreignField: 'dpi',
            as: 'history',
          },
        },
        sort,
      ];
    } else {
      return [{ $match: { statusD: 1 } }, sort];
    }
  }

  async getCounts(entity: string, query: any): Promise<any | null> {
    const dbModel = this.getConnection(entity);

    let queryCount = [];
    const count = { $count: 'entityCount' };

    if (Array.isArray(query)) {
      if (query.length > 0) {
        queryCount = [...query, count];
      } else {
        queryCount = [count];
      }
    } else {
      queryCount = [query, count];
    }

    const entityCreated = await dbModel.aggregate(queryCount).catch((err) => {
      throw err;
    });

    return entityCreated.length > 0 ? entityCreated[0].entityCount : 0;
  }

  async getHash(password: string) {
    return createHmac('sha512', password.toString()).digest('hex');
  }

  async validProgram(dpi: string, entity: string, program: string) {
    const dbModel = this.getConnection(entity);
    const find = await dbModel.find({ dpi }).catch((err) => {
      throw err;
    });

    if (find.length > 0) {
      throw new HttpException(
        `El DPI que intenta registrar, ya pertenece al programa ${program}.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByFieldChunks(
    entity: string,
    field: string,
    id: any,
    isNum: boolean,
  ): Promise<any | null> {
    console.log(isNum);
    const dbModel = this.getConnection(entity);
    const entityFound = await dbModel.find({ [field]: id }).catch((erro) => {
      if (erro.name === 'CastError') {
        erro.status = 404;
      }
      throw erro;
    });
    if (!entityFound) {
      throw new HttpException('Entity Not Found', 404);
    }
    return entityFound;
  }
}
