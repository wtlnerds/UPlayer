/* PUBLIC API
 init 
 next
 prev
 toggleState
*/
const STATUS = {
  LIST_LOOP: 1,
  RANDOM: 3,
  SINGLE_LOOP: 2,
}

class Queue {

  next() {
    if(this.state !== STATUS.SINGLE_LOOP){
      this.index ++
      if(this.index === this.length) this.index = 0
      this.nextTrack = this.getQueue()[this.index]
    }
    return this.nextTrack
  }

  prev() {
    if(this.state !== STATUS.SINGLE_LOOP){
      this.index --
      if(this.index === -1) this.index = this.length - 1
      this.nextTrack = this.getQueue()[this.index]
    }
    return this.nextTrack
  }

  getQueue(){
    if(this.state === STATUS.RANDOM){
      return this.ranQueue 
    }else{
      return this.queue
    }
  }

  // Fisher-Yates Shuffle
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  toggleState(){
    this.state ++
    if(this.state === 4) this.state = 1
  }

  constructor(trackList){
    this.queue = trackList
    this.ranQueue = JSON.parse(JSON.stringify(trackList))
    this.length = trackList.length
    this.shuffle(this.ranQueue)
    this.state = STATUS.LIST_LOOP
    this.index = 0
    this.nextTrack = this.queue[this.index]
  }
}

class TrackQueue {
  static init(trackList){
    this.q = new Queue(trackList)
  }

  static next(){
    return this.q.next()
  }

  static prev(){
    return this.q.prev()  
  }
  
  static toggleState(){
    return this.q.toggleState()
  }
}

export default TrackQueue
