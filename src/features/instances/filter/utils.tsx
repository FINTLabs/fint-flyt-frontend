export const handleToggle = (
  key: string,
  options: string[],
  option: string,
  isSelected: boolean,
  onSelect: (key: string, value: string[]) => void
) => {
  const updatedOptions = isSelected
    ? [...options, option]
    : options.filter((o) => o !== option);

  onSelect(key, updatedOptions);

  console.log("SETTING FILTER:", updatedOptions, isSelected, option);
};
