import {Duplex} from 'stream'


export class TerminalStream extends Duplex {
    constructor(vm) {
        super()
        this.$terminal = vm.$terminal
        this.$vm = vm
        this.encoding = vm.encoding || 'utf-8'

        if(!this.$terminal) throw new TypeError("VueTerm instance only")

        this.$terminal.on('data', data => this.push(Buffer.from(data, this.encoding)))
    }

    _write (chunk, encoding, callback) {
        if(chunk instanceof Buffer) {
            chunk = chunk.toString(this.encoding)
        }
        this.$terminal.write(chunk)
        if(callback)
            callback()
    }

    _final (callback) {
        this.$vm.$emit('final')
        if(callback) callback()
    }

    _read (size) {
    }
}