import * as yup from "yup";

const full_name = yup
  .string()
  .required("نام و نام خانوادگی را وارد کنید")
  .min(3, "نام باید حداقل 3 کاراکتر داشته باشد")
  .max(64, "نام باید حداکثر 64 کاراکتر داشته باشد");
const phoneNumber = yup
  .string()
  .required("شماره موبایل الزامی است")
  .matches(/^09\d{9}$/, "شماره موبایل اشتباه است");
