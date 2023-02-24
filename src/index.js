const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');

let splashScreen;

function createWindow() {
	let mainWindow = new BrowserWindow({
		width: 1280,
		height: 1000,
		autoHideMenuBar: true,
		resizable: false,
		icon: path.join(__dirname, '../images/gtaVSelfDrivingCarBG.png'),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false,
			worldSafeExecuteJavaScript: true,
			webSecurity: false // Add this line
		},
		contentSecurityPolicy: "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
	})

	mainWindow.loadURL(`file://${__dirname}/html/index.html`);

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
}


function createSplashScreen() {
	splashScreen = new BrowserWindow({
		width: 900,
		height: 600,
		frame: false,
		alwaysOnTop: true,
		resizable: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false,
			worldSafeExecuteJavaScript: true,
			webSecurity: false
		},
		contentSecurityPolicy: "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
	})

	splashScreen.loadURL(`file://${__dirname}/html/splash.html`);

	splashScreen.on('closed', () => {
		splashScreen = null
	})

	splashScreen.webContents.on('did-finish-load', () => {
		setTimeout(() => {
			createWindow();
			splashScreen.close();
		}, 3000);
	});
}

app.on('ready', function() {
	createSplashScreen();

	protocol.registerFileProtocol('app', (request, callback) => {
		const url = request.url.substr(6);
		callback({ path: path.normalize(`${__dirname}/${url}`)});
	});

	// Allow loading of file:// URLs
	const filter = {
		urls: ['file:///*']
	};

	app.on('session-created', (session) => {
		session.webRequest.onHeadersReceived(filter, (details, callback) => {
			callback({
				responseHeaders: Object.assign({
					'Access-Control-Allow-Origin': ['*']
				}, details.responseHeaders)
			});
		});
	});
});
