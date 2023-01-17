import "./style.css";
import { ErrorMessage, useField } from "formik";

export default function RegisterInput({ bottom, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      {/* {meta.touched && meta.error && !bottom && (
        <div className="input_error">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </div>
      )} */}

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholer={field.placeholer}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
