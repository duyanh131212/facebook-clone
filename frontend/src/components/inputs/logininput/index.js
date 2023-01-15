import "./style.css";
import { useField } from "formik";

export default function LoginInput({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        name={field.name}
        placeholer={field.placeholer}
        {...field}
        {...props}
      />
      <div></div>
    </div>
  );
}
