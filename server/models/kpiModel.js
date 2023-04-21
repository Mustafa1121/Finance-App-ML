import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
loadType(mongoose);

const monthSchema = new mongoose.Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  {
    toJSON: { getters: true },
  }
);

const daySchema = new mongoose.Schema(
  {
    day: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  {
    toJSON: { getters: true },
  }
);

const kpiSchema = new mongoose.Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  {
    toJSON: { getters: true },
    timestamps: true,
  }
);

const KPI = mongoose.model("KPI", kpiSchema);
export default KPI;
