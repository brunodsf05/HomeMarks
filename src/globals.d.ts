declare const __RUNTIME__: "web" | "extension.chrome" | "extension.firefox";

// TODO: Temporal mockup data
declare const exampleBookmark = {
  id: "1",
  title: "Marcadores",
  folderType: "folder",
  children: [
    {
      id: "2",
      parentId: "1",
      title: "Google",
      url: "https://www.google.com",
    },
    {
      id: "3",
      parentId: "1",
      title: "Wikipedia",
      url: "https://www.wikipedia.org",
    },
    {
      id: "4",
      parentId: "1",
      title: "Unsplash",
      url: "https://unsplash.com",
    },
    {
      id: "5",
      parentId: "1",
      title: "Multimedia",
      folderType: "folder",
      children: [
        {
          id: "6",
          parentId: "5",
          title: "Youtube",
          url: "https://www.youtube.com",
        },
        {
          id: "7",
          parentId: "5",
          title: "Netflix",
          url: "https://www.netflix.com",
        },
        {
          id: "8",
          parentId: "5",
          title: "Spotify",
          url: "https://www.spotify.com",
        },
        {
          id: "9",
          parentId: "5",
          title: "Soundcloud",
          url: "https://soundcloud.com",
        },
        {
          id: "10",
          parentId: "5",
          title: "Tiktok",
          url: "https://www.tiktok.com",
        },
      ],
    },
    {
      id: "11",
      parentId: "1",
      title: "Trabajo",
      folderType: "folder",
      children: [
        {
          id: "13",
          parentId: "11",
          title: "LinkedIn",
          url: "https://www.linkedin.com",
        },
        {
          id: "12",
          parentId: "11",
          title: "GitHub",
          url: "https://github.com/",
        },
        {
          id: "14",
          parentId: "11",
          title: "Nested1",
          children: [
            {
              id: "15",
              parentId: "14",
              title: "Nested2",
              children: [
                {
                  id: "16",
                  parentId: "15",
                  title: "Nested3",
                  children: [
                    {
                      id: "17",
                      parentId: "16",
                      title: "Nested4",
                      children: [
                        {
                          id: "18",
                          parentId: "17",
                          title: "GitHub",
                          url: "https://github.com/",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
