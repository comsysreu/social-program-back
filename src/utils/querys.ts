export class QuerysList {
    public static USERS = [
        {
            $match: { statusD: 1 },
        }, {
            $lookup: {
                from: 'profiles',
                localField: 'profileId',
                foreignField: 'externalId',
                as: 'profile',
            },
        }, {
            $unwind: { path: '$profile', preserveNullAndEmptyArrays: true },
        }
    ];
}