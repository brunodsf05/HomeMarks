const Home: React.FC = () => {
  const tasks = [
    "Themes\nProvide a minimal dark and light theme.\nExtend it to recoloring (e.g. dark theme with red tint).\nAnd finally all the style (fonts, roundness, spacing, etc...)",
    "Localization\nShow different strings depending on the user language.\nThe language can be selected automatically or manually.",
    "User configuration\nPreferences that must be remembered like which language to use, the theme, etc...",
  ];
  return (
    <>
      <h1>Things to do:</h1>
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
