import { useController } from "react-hook-form";
const PasswordField = (props) => {
  const { field } = useController(props);
  return (
    <div className="mt-2">
      <input
        type="password"
        {...field}
        placeholder={props.name}
        /*     name={props.name} */
        className="inputClass"
      />
      <p className="text-xs text-red-600">{props.error?.message}</p>
    </div>
  );
};
export default PasswordField;
