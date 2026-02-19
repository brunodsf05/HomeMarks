import { useTheme } from "@/contexts/theme";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";
import { useState } from "react";

const Home: React.FC = () => {
  const { t, i18n } = useTypedTranslation();
  const [stars, setStars] = useState(0);

  const {
    themePreferences: themePreference,
    setThemePreferences: setThemePreference,
  } = useTheme();

  const tasks = [
    t("test.todo.task.theme"),
    t("test.todo.task.localization"),
    t("test.todo.task.userconfig"),
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
    setThemePreference((prev) => {
      if (prev.isPolarityAuto)
        return {
          ...prev,
          polarity: "dark",
          isPolarityAuto: false,
        };

      if (prev.polarity === "dark")
        return {
          ...prev,
          polarity: "light",
          isPolarityAuto: false,
        };

      return {
        ...prev,
        isPolarityAuto: true,
      };
    });
  };

  return (
    <>
      <h1>{t("test.todo.title")}</h1>
      <button onClick={switchThemePolarity}>
        Change theme (Polarity is {themePreference.polarity}
        {themePreference.isPolarityAuto && " from the OS"})
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
      <p>{t("test.params.numbers", { count: stars })}</p>
      <input
        type="range"
        min={0}
        max={3}
        onChange={(e) => setStars(Number(e.target.value))}
      />
      <p>{i18n.language}</p>
    </>
  );
};

export default Home;
