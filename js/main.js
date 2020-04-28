const Typewriter = function (txtChanger, words, wait = 3000) {
  this.txtChanger = txtChanger;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//  type method
Typewriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;

  //  get full text of current word
  const fullTxt = this.words[current];

  //  check if deleted
  if (this.isDeleting) {
    //  remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //  add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //  insert txt into element
  this.txtChanger.innerHTML = `<span class="txt">${this.txt}</span>`;

  //  initial type speed
  let typeSpeed = 300;
  this.isDeleting && (typeSpeed /= 2);

  //  if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //  pause at end
    typeSpeed = this.wait;
    //  set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    //  move to next word
    this.wordIndex++;
    //  pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

//  init on DOM load
document.addEventListener('DOMContentLoaded', init);

//  init app
function init() {
  const txtChanger = document.querySelector('.txtChanger');
  const words = JSON.parse(txtChanger.getAttribute('data-words'));
  const wait = txtChanger.getAttribute('data-wait');
  //  init typewriter
  new Typewriter(txtChanger, words, wait);
}
