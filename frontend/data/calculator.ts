import { CalculatorConfig } from "@/lib/types";

// As per contract, profit rate is not fixed/guaranteed. Default is null.
export const seedCalculatorConfig: CalculatorConfig = {
  rates: {
    platinum: null,
    gold: null,
    silver: null,
    bronze: null,
  },
};

