import { sampleListData } from '@/data';

export default () => {
  return {
    api: {
      queryList: async () => {
        return Promise.resolve({
          data: {
            data: sampleListData,
            pagination: {
              pageSize: 20,
              current: 1,
              total: sampleListData.length,
            },
          },
          requestId: '80000036-0004-f700-b63f-84710c7967bb',
          status: 0,
          message: '',
          detailsErrorMessage: '',
        });
      },
    },
  };
};
