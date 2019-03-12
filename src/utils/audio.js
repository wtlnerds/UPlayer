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
      if(this.currentAudio)clearInterval(this.currentAudio.playInterval)
      this.currentAudio = null
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
     * onPlayingCallBack: passed in callback function per tick
     */
    constructor(){
        this.PLAYER_STATUS = this.constructor.status()
        this.status = this.PLAYER_STATUS.INIT
        this.position = 0
        this.startedTime = 0
        this.context = null
        this.sourceBuffer = null
    }

    init(audioCtx, audioFileBytes, onLoadFinished, onPlayingCallback){
        if(!audioFileBytes) return
        // console.log(audioFileBytes)
        let arrayBuffer = audioFileBytes.buffer
        this.onPlayingCallback = onPlayingCallback
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
        this.audioBufferSourceNode.start(this.context.currentTime, this.position)
        this.status = this.PLAYER_STATUS.PLAYING
        // timer
        this.playInterval = setInterval(() => {
          if(this.status === this.PLAYER_STATUS.PLAYING) this.position = this.context.currentTime - this.startedTime
          this.onPlayingCallback(this.position)
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
