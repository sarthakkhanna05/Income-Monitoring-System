import mongoose from "mongoose";

const EmployeeSalesSchema = mongoose.Schema({
  month_year: {
    type: String,
    required: true,
  },
  emp_names: {
    type: Array,
    default: [],
  },
  total_sales: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("EmployeeSales", EmployeeSalesSchema);
