import { useTheme } from "@/contexts/theme";

const Home: React.FC = () => {
  const {
    themePreferences: themePreference,
    setThemePreferences: setThemePreference,
  } = useTheme();

  const tasks = [
    "Themes\nProvide a minimal dark and light theme.\nExtend it to recoloring (e.g. dark theme with red tint).\nAnd finally all the style (fonts, roundness, spacing, etc...)",
    "Localization\nShow different strings depending on the user language.\nThe language can be selected automatically or manually.",
    "User configuration\nPreferences that must be remembered like which language to use, the theme, etc...",
  ];

  const switchTheme = () => {
    setThemePreference((prev) => {
      const isUsingFirstTheme = prev.themes.light.id === "light";

      return {
        ...prev,
        themes: {
          light: { id: isUsingFirstTheme ? "light2" : "light" },
          dark: { id: isUsingFirstTheme ? "dark2" : "dark" },
        },
      };
    });
  };

  const switchThemePolarity = () => {
    setThemePreference((prev) => ({
      ...prev,
      polarity: prev.polarity === "dark" ? "light" : "dark",
    }));
  };

  return (
    <>
      <h1>Things to do:</h1>
      <button onClick={switchThemePolarity}>
        Switch to{" "}
        {themePreference.polarity === "auto"
          ? "auto"
          : themePreference.polarity === "dark"
            ? "light"
            : "dark"}{" "}
        theme
      </button>
      <button onClick={switchTheme}>Switch theme</button>
      <ul>
        {tasks
          .map((task) => task.split("\n"))
          .map((task, taskIndex) => {
            const [title, ...descriptions] = task;
            return (
              <li key={taskIndex}>
                <h2>{title}</h2>
                {descriptions.map((description, descriptionIndex) => (
                  <p key={descriptionIndex}>{description}</p>
                ))}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Home;
