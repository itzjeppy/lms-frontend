/* This Service Component is just a temporary component used to simulate API Calls.
    
    This Service is to be replaced with actual API Calls in the future.
    */


const ProgramService = {
    getPrograms: async () => {
      return Promise.resolve({
        data: [
          {
            id: 1,
            name: "Holiday Discounts",
            active: true,
            startDate: "2024-12-01",
            endDate: "2025-01-31",
          },
          {
            id: 2,
            name: "Loyalty Rewards",
            active: false,
            startDate: "2024-10-01",
            endDate: "2024-12-31",
          },
          {
            id: 3,
            name: "Black Friday Sale",
            active: true,
            startDate: "2024-11-01",
            endDate: "2024-11-30",
          },
        ],
      });
    },
  };
  
  export default ProgramService;
  