const { BrowserWindow } = require('electron')

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({
            width: 900,
            height: 630,
            resizable: false,
        })

        this.loadURL(url)
    }
}

module.exports = MainWindow;