//
//
//
//
//
//
//

let slider_tempoMode;
let slider_playrate;
let slider_drywet;
let slider_delaytime;
let slider_delayamp;
let btn_playratereset;
let btn_effreset;
let playrate;
let beatStep;
let beatStep_play;
let button_stst;
let if_start = ![];
let startStamp;
let botton_playrate_e1;
let botton_playrate_lerp;
let lerp_rate = false;
let start_playrate_e1 = false;
let s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
let k1;
function preload() {
  s1 = loadSound("sound/1_d.wav");
  s2 = loadSound("sound/2_DrumSticks.wav");
  s3 = loadSound("sound/3_Bass1.wav");
  s4 = loadSound("sound/4_HumanAAH.wav");
  s5 = loadSound("sound/5_HumanEvil.wav");
  s6 = loadSound("sound/6_fart.wav");
  s7 = loadSound("sound/7_yapMale.wav");
  s8 = loadSound("sound/8_go.wav");
  s9 = loadSound("sound/9_oh.wav");
  s10 = loadSound("sound/10_DogBark.wav");
  s11 = loadSound("sound/11_KittyMeow.wav");
  s12 = loadSound("sound/12_Beep.wav");
  k1 = loadSound("sound/k1_DiscoDance.wav");
}
let sounds_tri = [];
let btn_t_clear;
let btn_t_s2;
let btn_t_s4;
let btn_t_s5;
let btn_t_s6;
let btn_t_s7;
let btn_t_s8;
let btn_t_s9;
let btn_t_s10;
let btn_t_s11;
let btn_t_s12;

let reverb;
let delay;

let btn_add_loop;
let btn_add_cue;
let btn_add_random;
let font_c;
let font_r;
let set_loop = 0;
let set_loop_is_set = false;

function setup() {
  createCanvas(400, 430);
  font_c = loadFont("Comfortaa-Medium.ttf");
  font_r = loadFont("RobotoMono-SemiBold.ttf");
  reverb = new p5.Reverb();
  reverb.process(k1, 3, 2);
  reverb.amp(0);
  delay = new p5.Delay();
  delay.process(k1, 0.12, 0.7, 2300);
  delay.amp(0);
  //slider
  slider_playrate = creatNewEffectsSlider(0, 1.5, 1, 0.01, 250, 90);
  slider_playrate.addClass("vertical");
  slider_drywet = creatNewEffectsSlider(0, 1, 0, 0.001, 50, 50, drywet_changed);
  slider_delaytime = creatNewEffectsSlider(0, 0.4, 0, 0.01, 50, 90, delay_changed);
  slider_delayamp = creatNewEffectsSlider(0, 1, 0, 0.01, 50, 130, delay_changed);
  //btn
  botton_playrate_e1 = createButton("sin");
  botton_playrate_e1.position(300, 210);
  botton_playrate_e1.addClass("btn");
  botton_playrate_e1.mouseClicked(botton_playrate_e1_f);

  botton_playrate_lerp = createButton("lerp");
  botton_playrate_lerp.position(300, 240);
  botton_playrate_lerp.addClass("btn");
  botton_playrate_lerp.mouseClicked(botton_playrate_lerp_f);

  button_stst = createButton("Play/Pause");
  button_stst.id("button_stst");
  button_stst.addClass("btn");
  btn_add_loop = createButton("loop");
  btn_add_loop.position(300, 300);
  btn_add_loop.addClass("btn");
  btn_add_loop.id("button_loop");
  btn_add_loop.mouseClicked(set_loop_f);

  btn_add_cue = createButton("Cue");
  btn_add_cue.position(240, 300);
  btn_add_cue.addClass("btn");
  btn_add_cue.id("button_loop");
  btn_add_cue.mouseClicked(set_cue_f);

  btn_add_random = createButton("random");
  btn_add_random.position(280, 270);
  btn_add_random.addClass("btn");
  btn_add_random.id("button_loop");
  btn_add_random.mouseClicked(set_random_f);

  btn_t_clear = createButton("Clear");
  btn_t_clear.position(170, 280);
  btn_t_clear.addClass("btn");
  btn_t_clear.mouseClicked(t_clear);
  btn_t_clear.id("button_reset");
  btn_t_s2 = createNewEffectsButton("drum stick", 50, 280, s2);
  btn_t_s4 = createNewEffectsButton("AHHH", 50, 305, s4);
  btn_t_s5 = createNewEffectsButton("Evil", 50, 355, s5);
  btn_t_s6 = createNewEffectsButton("Fart", 120, 305, s6);
  btn_t_s7 = createNewEffectsButton("Yap", 50, 330, s7);
  btn_t_s8 = createNewEffectsButton("Go", 170, 305, s8);
  btn_t_s9 = createNewEffectsButton("Oh", 100, 330, s9);
  btn_t_s10 = createNewEffectsButton("Woof", 100, 355, s10);
  btn_t_s11 = createNewEffectsButton("Meow", 155, 355, s11);
  btn_t_s12 = createNewEffectsButton("Beep", 145, 330, s12);

  button_stst.position(250, 330);
  button_stst.mouseClicked(stst);
  btn_playratereset = createButton("reset");
  btn_playratereset.id("btn_playratereset");
  btn_playratereset.addClass("btn");
  btn_playratereset.position(295, 180);
  btn_playratereset.mouseClicked(resetPlayrate);
  btn_playratereset.id("button_reset");
  btn_effreset = createButton("reset");
  btn_effreset.id("btn_effreset");
  btn_effreset.addClass("btn");
  btn_effreset.position(210, 120);
  btn_effreset.mouseClicked(resetEff);
  btn_effreset.id("button_reset");
  beatStep = 0;
}
function drywet_changed() {
  let r = slider_drywet.value();
  reverb.amp(r);
}
function delay_changed() {
  let a = slider_delayamp.value();
  let t = slider_delaytime.value();
  delay.process(k1, t, 0.7, 2300);
  delay.amp(a);
}
function createNewEffectsButton(label, posx, posy, sound) {
  const button = createButton(label);
  button.addClass("btn");
  button.position(posx, posy);
  button.mouseClicked(() => {
    tri_f(sound);
  });
  return button;
}
function creatNewEffectsSlider(min, max, defaultValue, step, x, y, changeCallback) {
  let slider = createSlider(min, max, defaultValue, step);
  slider.position(x, y);
  slider.addClass("slider");
  if (changeCallback) {
    slider.changed(changeCallback);
  }
  return slider;
}
function t_clear() {
  sounds_tri = [];
}
function set_loop_f() {
  if (!set_loop_is_set) {
    set_loop = k1.currentTime() - beatStep / 2;
    set_loop_is_set = true;
  } else {
    set_loop_is_set = false;
    set_loop = 0;
  }
}
function set_cue_f() {
  let set_cue = k1.currentTime() - beatStep / 2;
  k1.jump(set_cue);
}
function botton_playrate_lerp_f() {
  lerp_rate = true;
}
function set_random_f() {
  if (if_start) {
    k1.jump(random(k1.duration()));
  }
}
function draw() {
  background(116, 90, 51);
  push();
  textFont(font_c);
  fill(94, 178, 153);
  rect(20, 20, width - 40, height - 40, 40);
  fill(71, 65, 67);
  textSize(9);
  text("Dry                                         Wet", 50, 45);
  text("Delay Time", 90, 88);
  text("Delay Vol", 90, 128);
  pop();
  if (if_start && !k1.isPlaying()) {
    k1.amp(0.8);
    k1.play();
  }
  if (!if_start && k1.isPlaying()) {
    k1.pause();
  }

  if (start_playrate_e1) {
    let e1t = (millis() - start_playrate_e1) / 1000;
    let e1r = cos(e1t) / 4 + 0.75;
    slider_playrate.value(e1r);
    if (e1t >= PI * 2) {
      start_playrate_e1 = false;
      startStamp -= 1000;
    }
  }
  if (lerp_rate && k1.rate() > 0) {
    let cur_r = slider_playrate.value();
    let r = lerp(cur_r, -0.5, 0.01);
    slider_playrate.value(r);
  } else if (lerp_rate && k1.rate() == 0) {
    if_start = false;
    lerp_rate = false;
    k1.amp(0);
    slider_playrate.value(1);
  }
  playrate = slider_playrate.value();
  beatStep = (k1.currentTime() * 2) % 4;
  k1.rate(playrate);

  if (if_start) {
    for (let s of sounds_tri) {
      s.play(beatStep);
    }
    if (set_loop_is_set && k1.currentTime() - set_loop > 2) {
      k1.jump(set_loop);
    }
  }
  push();
  noStroke();
  fill(71, 65, 67);
  rect(50, 173, 200, 70, 20);
  fill(159, 229, 194);
  rect(50, 170, 200, 70, 20);
  fill(71, 65, 67);
  textFont(font_r);
  textSize(35);
  text(int(beatStep + 1), 80, 220);
  textAlign(RIGHT);
  text(k1.currentTime().toFixed(1), 230, 220);
  textSize(10);
  text(int(k1.currentTime() / 2), 120, 230);
  text(slider_playrate.value().toFixed(2), 230, 230);
  fill(71, 65, 67);
  rect(60, 253, 180, 10, 10);
  text("0",300,90)
  fill(140, 190, 178);
  rect(60, 250, 180, 10, 10);
  fill(255, 100, 68);
  if (int(beatStep + 1) == 1) {
    rect(70, 250, 40, 10);
  } else if (int(beatStep + 1) == 2) {
    rect(110, 250, 40, 10);
  } else if (int(beatStep + 1) == 3) {
    rect(150, 250, 40, 10);
  } else if (int(beatStep + 1) == 4) {
    rect(190, 250, 40, 10);
  }
  stroke(255);
  line(70 + beatStep * 40, 250, 70 + beatStep * 40, 260);
  pop();
}

function stst() {
  userStartAudio();
  if_start = !if_start;
  startStamp = millis();
}

function resetPlayrate() {
  slider_playrate.value(1);
}

function resetEff() {
  slider_drywet.value(0);
  reverb.amp(0);

  slider_delayamp.value(0);
  slider_delaytime.value(0);
  delay.process(k1, 0, 0.7, 2300);
  delay.amp(0);
}

function botton_playrate_e1_f() {
  start_playrate_e1 = millis();
}

function tri_f(sound) {
  sound.play();
  if (if_start) {
    let s = new Sound_tri(sound, beatStep);
    sounds_tri.push(s);
  }
}

class Sound_tri {
  constructor(sound, temple) {
    this.sound = sound;
    this.temple = temple;
    this.debouncedFunction = this.debounce(this.play, 50);
    this.playedtimeStamp = 0;
  }
  play() {
    if (abs(beatStep - this.temple - 0.2) < 0.3 && millis() - this.playedtimeStamp > 800) {
      this.sound.play();
      this.sound.rate(playrate);
      this.playedtimeStamp = millis();
    }
  }
  control() {}
  debounce(func, delay) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
}

// LICENSE CERTIFICATE: Envato Elements Item
// =================================================
// This license certificate documents a license to use the item listed below
// on a non-exclusive, commercial, worldwide and revokable basis, for
// one Single Use for this Registered Project.

// Item Title:                      Disco Dance
// Item URL:                        https://elements.envato.com/disco-dance-97UJWG3
// Item ID:                         97UJWG3
// Author Username:                 Bransboynd
// Licensee:                        Hsin CHEN
// Registered Project Name:         Paxton 瀚森
// License Date:                    November 6th, 2023
// Item License Code:               95PB28DK3C

// The license you hold for this item is only valid if you complete your End
// Product while your subscription is active. Then the license continues
// for the life of the End Product (even if your subscription ends).

// For any queries related to this document or license please contact
// Envato Support via https://help.elements.envato.com/hc/en-us/requests/new

// Envato Elements Pty Ltd (ABN 87 613 824 258)
// PO Box 16122, Collins St West, VIC 8007, Australia
// ==== THIS IS NOT A TAX RECEIPT OR INVOICE ====

// LICENSE CERTIFICATE: Envato Elements Item
// =================================================
// This license certificate documents a license to use the item listed below
// on a non-exclusive, commercial, worldwide and revokable basis, for
// one Single Use for this Registered Project.

// Item Title:                      Fashion Summer Lounge
// Item URL:                        https://elements.envato.com/fashion-summer-lounge-ZFUJG4S
// Item ID:                         ZFUJG4S
// Author Username:                 Micrah
// Licensee:                        Hsin CHEN
// Registered Project Name:         Paxton 瀚森
// License Date:                    November 7th, 2023
// Item License Code:               KMR3CSVEUG

// The license you hold for this item is only valid if you complete your End
// Product while your subscription is active. Then the license continues
// for the life of the End Product (even if your subscription ends).

// For any queries related to this document or license please contact
// Envato Support via https://help.elements.envato.com/hc/en-us/requests/new

// Envato Elements Pty Ltd (ABN 87 613 824 258)
// PO Box 16122, Collins St West, VIC 8007, Australia
// ==== THIS IS NOT A TAX RECEIPT OR INVOICE ====



