type ToggleButtonProps = {
  expanded: boolean;
  onClick: () => void;
};

export function ToggleButton({ expanded, onClick }: ToggleButtonProps) {
  return (
    <button className="toggle" onClick={onClick}>
      {expanded ? "▼" : "▶"}
    </button>
  );
}
