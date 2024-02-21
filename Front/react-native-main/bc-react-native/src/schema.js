import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required().min(4).max(22),
  subtitle: yup.string().required().min(8).max(32),
  content: yup.string().required().min(12).max(260),
});
