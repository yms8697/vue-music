export default class Song {
  constructor ({id, name, playUrl, singer, duration, album}) {
    this.id = id
    this.name = name
    this.playUrl = playUrl
    this.singer = singer
    this.duration = duration
    this.album = album
  }
}
