class Audio {
    static currentAudio = null
    
    static status() {
      return {
        PLAYING: 1,
        PAUSED: 2,
        INIT: 3,
        LOADING: 4
      }
    }

    static reset(){
      // need to clear the interval
      if(this.currentAudio.audioBufferSourceNode) this.currentAudio.audioBufferSourceNode.stop()
      if(this.currentAudio)clearInterval(this.currentAudio.playInterval)
      delete this.currentAudio
    }

    static getAudio(){
        if(Audio.currentAudio == null){
            Audio.currentAudio = new Audio()
        }
        return Audio.currentAudio
    }

    /* Attributes:
     * this.context: resuse
     * position
     * startedTime
     * status
     * sourceBuffer: current song bytes array
     * playInterval: interval call back function
     * onPlaying: passed in callback function per tick
     * onPlayingFinished: passed in callback function when song is finished
     */
    constructor(){
        this.PLAYER_STATUS = this.constructor.status()
        this.status = this.PLAYER_STATUS.INIT
        this.position = 0
        this.startedTime = 0
        this.context = null
        this.sourceBuffer = null
    }

    init(
      audioCtx, 
      audioFileBytes, 
      onLoadFinished, 
      onPlaying,
      onPlayingFinished
    ){
        if(!audioFileBytes) return
        // console.log(audioFileBytes)
        let arrayBuffer = audioFileBytes.buffer
        this.onPlaying = onPlaying
        this.onPlayingFinished = onPlayingFinished
        this.context = audioCtx
        this.context.decodeAudioData(arrayBuffer, (buffer) => {
            this.sourceBuffer = buffer
            onLoadFinished()
        })
    }

    duration() {
        return this.sourceBuffer.duration
    }

    play() {
        if(this.status === this.PLAYER_STATUS.PLAYING) return
        this.startedTime = this.context.currentTime - this.position
        this.audioBufferSourceNode = this.context.createBufferSource()
        this.audioBufferSourceNode.buffer = this.sourceBuffer
        this.audioBufferSourceNode.connect(this.context.destination)
        this.audioBufferSourceNode.loop = true
        this.audioBufferSourceNode.start(this.context.currentTime, this.position)
        this.status = this.PLAYER_STATUS.PLAYING
        // timer
        this.playInterval = setInterval(() => {
          if(this.position >= this.duration() - 1){
            clearInterval(this.playInterval)
            this.onPlayingFinished()
            return
          }
          if(this.status === this.PLAYER_STATUS.PLAYING) this.position = this.context.currentTime - this.startedTime
          this.onPlaying(this.position)
        }, 1000)
    }

    pause() {
        if(this.status !== this.PLAYER_STATUS.PLAYING) return
        this.status = this.PLAYER_STATUS.PUASED
        let elapsed = this.context.currentTime - this.startedTime
        this.audioBufferSourceNode.stop()
        this.position = elapsed
    }
}

export default Audio
