export function Player(aCtx, audioFile) {
  // aquí hace falta poner la secuencia, audiofile está en html

  this.audioFile = audioFile

  this.audioCtx = aCtx

  // this.startTime = this.audioCtx.currentTime; // para medir

  // si no hay argumentos, entonces reproduce el audio una sola vez

  // separar load al menos para conceptualmente tener claro que primero se tiene que cargar el archivo. Esto sucede en cada evento
  // this.source;

  this.buffer = 0

  this.futureTickTime = this.audioCtx.currentTime
  this.counter = 1
  this.tempo = 120
  this.secondsPerBeat = 60 / this.tempo
  this.counterTimeValue = this.secondsPerBeat / 4
  this.timerID = undefined
  this.isPlaying = false
  this.seq = [0, 0, 0, 0, 0, 0, 0, 0]

  this.load = function () {
    this.reader = new FileReader()
    this.reader.onload = function (ev) {
      // this.audioCtx = aCtx;
      // console.log(this.audioCtx);
      this.audioCtx.decodeAudioData(ev.target.result).then(function (buffer) {
        //this.source = this.audioCtx.createBufferSource()
        //this.source.buffer = buffer; // este estaba antes, ahora solamente queremos que se guarde
        this.buffer = buffer
        //this.source.connect(this.audioCtx.destination) // Pregunta: una vez que termina, también se desconecta?
        //this.source.start() // no es necesario reproducirlo aqui
        console.log('sample')
        // console.log(this.buffer);
        this.counter = 0
        this.futureTickTime = this.audioCtx.currentTime
        this.scheduler()
      })
    }

    this.reader.readAsArrayBuffer(this.audioFile.files[0])
    // aquí se reproduce la secuencia
  }

  this.load()

  this.startSeq = function () {
    this.counter = 0
    this.futureTickTime = this.audioCtx.currentTime
    this.scheduler()
  }

  this.playSource = function (time) {
    console.log('algo')
    this.source = this.audioCtx.createBufferSource()
    this.source.connect(this.audioCtx.destination)
    this.source.buffer = this.buffer
    this.source.start(this.audioCtx.currentTime + time)
  }

  this.schedule = function (time) {
    if (this.seq[this.counter] == 1) {
      this.playSource(time)
      console.log('otro algo')
    }
  }

  this.playTick = function () {
    console.log(this.counter)
    this.secondsPerBeat = 60 / this.tempo
    this.counterTimeValue = this.secondsPerBeat / 1
    this.counter += 1
    this.futureTickTime += this.counterTimeValue
    if (this.counter == this.seq.length) {
      this.counter = 0
    }
  }

  this.scheduler = function () {
    if (this.futureTickTime < this.audioCtx.currentTime + 0.1) {
      this.schedule(this.futureTickTime - this.audioCtx.currentTime)
      this.playTick()
    }

    this.timerID = setTimeout(this.scheduler, 0)
  }

  this.sequence = function (seq) {
    this.seq = seq
  }

  this.stop = function () {
    clearTimeout(this.timerID)
  }

  // console.log(this.buffer);
  // this.load(); // esto es mandatory
}
