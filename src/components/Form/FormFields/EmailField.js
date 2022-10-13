import { useController } from "react-hook-form";
const EmailField = (props) => {
  const { field } = useController(props);
  return (
    <div className="mt-2">
      <input
        {...field}
        type="email"
        placeholder={props.name}
        className="inputClass"
      />
      <p className="text-xs text-red-600">{props.error?.message}</p>
    </div>
  );
};
export default EmailField;
