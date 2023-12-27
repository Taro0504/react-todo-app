type Props = {
  text: string;
  onsubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormDialog = (props: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onsubmit();
      }}
    >
      <input type="text" value={props.text} onChange={props.onChange} />
      <input type="submit" value="追加" onSubmit={props.onsubmit} />
    </form>
  );
};
