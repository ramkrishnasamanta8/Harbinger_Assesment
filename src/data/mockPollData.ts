const mockPollData = [
    {
      id: "poll1",
      title: "Favorite Programming Language",
      questions: [
        {
          id: "question1",
          questionText: "What is your favorite programming language?",
          type: "single-choice",
          options: [
            { id: "q1", text: "JavaScript" },
            { id: "q2", text: "Python" },
            { id: "q3", text: "C++" },
          ],
          conditional: null,
        },
        {
          id: "question2",
          questionText: "Do you like TypeScript?",
          type: "yes-no",
          options: [
            { id: "yes", text: "Yes" },
            { id: "no", text: "No" },
          ],
          conditional: { dependsOn: "q1", optionId: "o2" }, // Only if Python is selected.
        },
      ],
    },
    {
        id: "poll2",
        title: "database do you use most often",
        questions: [
          {
            id: "question1",
            questionText: "Which database do you use most often?",
            type: "single-choice",
            options: [
              { id: "q1", text: "MySQL" },
              { id: "q2", text: "MongoDB" },
              { id: "q3", text: "Reaml" },
              { id: "q4", text: "SQLite" },
            ],
            conditional: null,
          },
          {
            id: "question2",
            questionText: "Do you like Java?",
            type: "yes-no",
            options: [
              { id: "yes", text: "Yes" },
              { id: "no", text: "No" },
            ],
            conditional: { dependsOn: "q1", optionId: "o2" }, // Only if Python is selected.
          },
        ],
      },
  ];
  
  export default mockPollData;

