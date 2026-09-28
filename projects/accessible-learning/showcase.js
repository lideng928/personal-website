const questions = [
  {
    prompt: 'A “Continue” control moves a learner to the next step in a lesson. Which implementation is the best starting point?',
    choices: ['A div with a click handler', 'A native button with a clear label', 'An image of a button'],
    answer: 1,
    explanation: 'A native button provides button semantics and built-in keyboard activation. A clickable div or image would need extra work to provide equivalent behaviour.',
  },
  {
    prompt: 'A learner tabs through a form but cannot tell which control is selected. What should you improve?',
    choices: ['Add a visible keyboard focus indicator', 'Remove the controls from the tab order', 'Add a hover effect for the mouse'],
    answer: 0,
    explanation: 'A visible focus indicator shows where keyboard input will go. A hover effect helps pointer users but does not replace keyboard focus styling.',
  },
  {
    prompt: 'A lesson links to a worksheet. Which link label makes its destination clearest?',
    choices: ['Click here', 'Learn more', 'Download the accessibility worksheet (PDF)'],
    answer: 2,
    explanation: 'A descriptive label tells learners what they will open and identifies the file format. Generic labels such as “Click here” leave that purpose unclear.',
  },
];

const form = document.querySelector('#knowledge-check');
const legend = document.querySelector('#question');
const choices = document.querySelector('#choices');
const feedback = document.querySelector('#feedback');
const next = document.querySelector('#next-question');
let current = 0;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = form.querySelector('input:checked');
  if (!selected) {
    feedback.textContent = 'Choose an answer before checking it.';
    delete feedback.dataset.correct;
    return;
  }
  const question = questions[current];
  const correct = Number(selected.value) === question.answer;
  feedback.dataset.correct = String(correct);
  feedback.textContent = `${correct ? 'That’s right.' : 'Not quite. Try again if you like.'} ${question.explanation}`;
  next.hidden = false;
  next.textContent = current === questions.length - 1 ? 'Restart preview ↺' : 'Next scenario →';
});

form.addEventListener('change', () => {
  feedback.textContent = '';
  next.hidden = true;
});

next.addEventListener('click', () => {
  current = (current + 1) % questions.length;
  const question = questions[current];
  legend.textContent = question.prompt;
  choices.replaceChildren(...question.choices.map((text, index) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = String(index);
    const span = document.createElement('span');
    span.textContent = text;
    label.append(input, span);
    return label;
  }));
  document.querySelector('#question-count').textContent = `${String(current + 1).padStart(2, '0')} / 03`;
  feedback.textContent = '';
  next.hidden = true;
  legend.tabIndex = -1;
  legend.focus();
});
