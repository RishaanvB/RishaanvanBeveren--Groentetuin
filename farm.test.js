beforeAll(() => console.log("Test started"))
afterAll(() => console.log("Test finished"))


const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit, } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe('getCostsForCrop ', () => {
    test('Calculate cost for single crop', () => {
        const corn = {
            name: "corn",
            yield: 3,
            seedCosts: 5,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getCostsForCrop(input)).toBe(50);

    });
});



describe('getRevenueForCrop ', () => {
    test('Calculate revenue for crop', () => {
        const corn = {
            name: "corn",
            yield: 3,
            salePrice: 2,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getRevenueForCrop(input)).toBe(60);

    });
});

describe('getProfitForCrop ', () => {
    test('Calculate profit for crop', () => {
        // revenue  = salePrice * yield * numCrops = 2*3 * 10 = 60
        // costs = seedCosts * numCrops = 5 * numCrops = 5 * 10 = 50
        // profit = revenue -costs = 60-50= 10 
        const corn = {
            name: "corn",
            yield: 3,
            salePrice: 2,
            seedCosts: 5,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };

        expect(getProfitForCrop(input)).toBe(10);

    });
});



describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops", () => {
        // ====CORN====  
        // revenue  = salePrice  * yield * numCrops = 2*3 * 5 = 30
        // costs = seedCosts * numCrops = 5 * numCrops = 5 * 5 = 25
        // profit = revenue -costs = 30-25= 5
        // ====PUMPKIN====  
        // revenue  = salePrice  * yield * numCrops = 5 * 4 * 2 = 40
        // costs = seedCosts * numCrops =  2 * 2 = 4
        // profit = revenue -costs = 40 - 4 =36

        const corn = {
            name: "corn",
            yield: 3,
            salePrice: 2,
            seedCosts: 5,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            salePrice: 5,
            seedCosts: 2,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getProfitForCrop(crops[0])).toBe(5);
        expect(getProfitForCrop(crops[1])).toBe(36);
        expect(getTotalProfit({ crops })).toBe(41);
    });


});