const workbenchDataNested = [
  {
    title: '这里是组1',
    completed: true,
    member: [
      {
        title: '这里是组1',
      }
    ],
    memberData: [
      {
        title2: '这里是组11',
        completed: true,
        quiz: false,
        member2: [
          {
            exId: 1,
            completed: true,
            excercise: 'one',
          },
          {
            exId: 2,
            completed: true,
            excercise: 'two',
          },
          {
            exId: 3,
            completed: true,
            excercise: 'three',
          }
        ],
      },
      {
        title2: '这里是组12',
        completed: true,
        quiz: false,
        member2: [
          {
            exId: 1,
            completed: true,
            excercise: 'one',
          },
          {
            exId: 2,
            completed: true,
            excercise: 'two',
          },
          {
            exId: 3,
            completed: true,
            excercise: 'three',
          }
        ]
      },
      {
        title2: '这里是组13',
        completed: true,
        quiz: true
      },
    ]
  },
  {
    title: '这里是组2',
    completed: false,
    member: [
      {
        title: '这里是组2',
      }
    ],
    memberData: [
      {
        title2: '这里是组21',
        completed: true,
        quiz: false,
        member2: [
          {
            exId: 1,
            completed: true,
            excercise: 'one',
          },
          {
            exId: 2,
            completed: true,
            excercise: 'two',
          },
          {
            exId: 3,
            completed: true,
            excercise: 'three',
          }
        ]
      },
      {
        title2: '这里是组22',
        completed: false,
        quiz: false,
        member2: [
          {
            exId: 1,
            completed: true,
            excercise: 'one',
          },
          {
            exId: 2,
            completed: true,
            excercise: 'two',
          },
          {
            exId: 3,
            completed: true,
            excercise: 'three',
          },
          {
            exId: 1,
            completed: true,
            excercise: 'one',
          },
          {
            exId: 2,
            completed: false,
            excercise: 'two',
          },
          {
            exId: 3,
            completed: false,
            excercise: 'three',
          },
          {
            exId: 1,
            completed: false,
            excercise: 'one',
          },
          {
            exId: 2,
            completed: false,
            excercise: 'two',
          },
          {
            exId: 3,
            completed: false,
            excercise: 'three',
          }
        ]
      },
    ]
  },
];

export default {
  workbenchDataNested,
};