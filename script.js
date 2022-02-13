const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function toggleplay() {
	if (video.paused) {
		video.play();
	}else{
		video.pause();
	}
}
function togglebtn(){
	const icon=  this.paused ? '►' : '❚ ❚';
	toggle.textContent=icon;
}
function skip(){
	video.currentTime+=parseFloat(this.dataset.skip);
}
function rangeUpdate() {
	video[this.name]=this.value;
}
function progressChange(){
	const percent=(video.currentTime/video.duration)*100;
	progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  	video.currentTime = scrubTime;
}
video.addEventListener('click',toggleplay);
video.addEventListener('play',togglebtn);
video.addEventListener('pause',togglebtn);
toggle.addEventListener('click',toggleplay);
video.addEventListener('timeupdate',progressChange)
skipButtons.forEach(btn=>btn.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',rangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',rangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
