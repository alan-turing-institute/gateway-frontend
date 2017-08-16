/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga 	/ http://lantiga.github.io
 */

import { Vector2, Vector3, Quaternion } from 'three/src/Three';
import { PipeComponent } from "app/three/pipe/pipe.component";

declare interface ThreeScreen {
	left: number;
	top: number;
	height: number;
	width: number;
}

const STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
let _this: TrackballControls; 
let _pipe: PipeComponent;

export class TrackballControls {

	object: any;
	enabled: boolean;
	domElement: any;
	screen: ThreeScreen;
	rotateSpeed: number;
	zoomSpeed: number;
	panSpeed: number;
	noRotate: boolean;
	noPan: boolean;
	noZoom: boolean;
	staticMoving: boolean;
	dynamicDampingFactor: number;
	minDistance: number;
	maxDistance: number;
	keys: number[];
	target: any;
	target0: any;
	position0: any;
	up0: any;


	STATE: any;
	EPS: number;
	lastPosition: any;
	_state: number;
	_prevState: any;
	_eye: any;
	_movePrev: any;
	_moveCurr: any;
	_lastAxis: any;
	_lastAngle: number;
	_zoomStart: any;
	_zoomEnd: any;
	_touchZoomDistanceStart: number;
	_touchZoomDistanceEnd: number;
	_panStart: any;
	_panEnd: any;

	_getMouseOnCircle_vector: any;
	_private_getMouseOnSreen_vector: any;

	_rotateCamera_axis: any;
	_rotateCamera_quaternion: any;
	_rotateCamera_eyeDirection: any;
	_rotateCamera_objectUpDirection: any;
	_rotateCamera_objectSidewaysDirection: any;
	_rotateCamera_moveDirection: any;
	_rotateCamera_angle: any;

	_panCamera_mouseChange: any;
	_panCamera_objectUp: any;
	_panCamera_pan: any;

	changeEvent: any;
	startEvent: any;
	endEvent: any;

	constructor(object, domElement, pipe: PipeComponent) {

		_this = this;
		_pipe = pipe;

		this.object = object;
		this.domElement = (domElement !== undefined) ? domElement : document;

		// API

		this.enabled = true;

		this.screen = { left: 0, top: 0, width: 0, height: 0 };

		this.rotateSpeed = 1.0;
		this.zoomSpeed = 1.2;
		this.panSpeed = 0.3;

		this.noRotate = false;
		this.noZoom = false;
		this.noPan = false;

		this.staticMoving = false;
		this.dynamicDampingFactor = 0.2;

		this.minDistance = 0;
		this.maxDistance = Infinity;

		this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

		// internals

		this.target = new Vector3();

		this.EPS = 0.000001;

		this.lastPosition = new Vector3();

		this._state = STATE.NONE,
			this._prevState = STATE.NONE,

			this._eye = new Vector3(),

			this._movePrev = new Vector2(),
			this._moveCurr = new Vector2(),

			this._lastAxis = new Vector3(),
			this._lastAngle = 0,

		this._zoomStart = new Vector2(),
			this._zoomEnd = new Vector2(),

			this._touchZoomDistanceStart = 0,
			this._touchZoomDistanceEnd = 0,

			this._panStart = new Vector2(),
			this._panEnd = new Vector2();

		// for reset

		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.up0 = this.object.up.clone();

		// events

		this.changeEvent = document.createEvent("MouseEvent");
		this.startEvent = document.createEvent("MouseEvent");
		this.endEvent =document.createEvent("MouseEvent");


		// Extra
		this._private_getMouseOnSreen_vector = new Vector2();
		this._getMouseOnCircle_vector = new Vector2();

		this._rotateCamera_axis = new Vector3();
		this._rotateCamera_quaternion = new Quaternion();
		this._rotateCamera_eyeDirection = new Vector3();
		this._rotateCamera_objectUpDirection = new Vector3();
		this._rotateCamera_objectSidewaysDirection = new Vector3();
		this._rotateCamera_moveDirection = new Vector3();
		this._rotateCamera_angle = undefined;

		this._panCamera_mouseChange = new Vector2();
		this._panCamera_objectUp = new Vector3();
		this._panCamera_pan = new Vector3();


		this.domElement.addEventListener('contextmenu', this.contextmenu, false);
		this.domElement.addEventListener('mousedown', this.mousedown, false);
		this.domElement.addEventListener('wheel', this.mousewheel, false);
		
		this.domElement.addEventListener('touchstart', this.touchstart, false);
		this.domElement.addEventListener('touchend', this.touchend, false);
		this.domElement.addEventListener('touchmove', this.touchmove, false);
		
		window.addEventListener('keydown', this.keydown, false);
		window.addEventListener('keyup', this.keyup, false);
		
		this.handleResize();
		
		// force an update at start
		this.update();

	}

	public handleResize() {

		if (this.domElement === document) {

			this.screen.left = 0;
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

		} else {

			var box = this.domElement.getBoundingClientRect();
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left = box.left + window.pageXOffset - d.clientLeft;
			this.screen.top = box.top + window.pageYOffset - d.clientTop;
			this.screen.width = box.width;
			this.screen.height = box.height;

		}

	}

	public handleEvent(event) {

		if (typeof this[event.type] == 'function') {

			this[event.type](event);

		}

	}

	private getMouseOnScreen(pageX, pageY) {

		this._private_getMouseOnSreen_vector.set(
			(pageX - this.screen.left) / this.screen.width,
			(pageY - this.screen.top) / this.screen.height
		);

		return this._private_getMouseOnSreen_vector;

	}

	private getMouseOnCircle (pageX, pageY) {

		this._getMouseOnCircle_vector.set(
			((pageX - this.screen.width * 0.5 - this.screen.left) / (this.screen.width * 0.5)),
			((this.screen.height + 2 * (this.screen.top - pageY)) / this.screen.width) // screen.width intentional
		);

		return this._getMouseOnCircle_vector;

	}

 public rotateCamera() {

		this._rotateCamera_moveDirection.set(this._moveCurr.x - this._movePrev.x, this._moveCurr.y - this._movePrev.y, 0);
		this._rotateCamera_angle = this._rotateCamera_moveDirection.length();

		if (this._rotateCamera_angle) {

			this._eye.copy(this.object.position).sub(this.target);

			this._rotateCamera_eyeDirection.copy(this._eye).normalize();
			this._rotateCamera_objectUpDirection.copy(this.object.up).normalize();
			this._rotateCamera_objectSidewaysDirection.crossVectors(this._rotateCamera_objectUpDirection, this._rotateCamera_eyeDirection).normalize();

			this._rotateCamera_objectUpDirection.setLength(this._moveCurr.y - this._movePrev.y);
			this._rotateCamera_objectSidewaysDirection.setLength(this._moveCurr.x - this._movePrev.x);

			this._rotateCamera_moveDirection.copy(this._rotateCamera_objectUpDirection.add(this._rotateCamera_objectSidewaysDirection));

			this._rotateCamera_axis.crossVectors(this._rotateCamera_moveDirection, this._eye).normalize();

			this._rotateCamera_angle *= this.rotateSpeed;
			this._rotateCamera_quaternion.setFromAxisAngle(this._rotateCamera_axis, this._rotateCamera_angle);

			this._eye.applyQuaternion(this._rotateCamera_quaternion);
			this.object.up.applyQuaternion(this._rotateCamera_quaternion);

			this._lastAxis.copy(this._rotateCamera_axis);
			this._lastAngle = this._rotateCamera_angle;

		} else if (!this.staticMoving && this._lastAngle) {

			this._lastAngle *= Math.sqrt(1.0 - this.dynamicDampingFactor);
			this._eye.copy(this.object.position).sub(this.target);
			this._rotateCamera_quaternion.setFromAxisAngle(this._lastAxis, this._lastAngle);
			this._eye.applyQuaternion(this._rotateCamera_quaternion);
			this.object.up.applyQuaternion(this._rotateCamera_quaternion);

		}

		this._movePrev.copy(this._moveCurr);

	};


public zoomCamera () {

	var factor;

	if (this._state === STATE.TOUCH_ZOOM_PAN) {

		factor = this._touchZoomDistanceStart / this._touchZoomDistanceEnd;
		this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
		this._eye.multiplyScalar(factor);

	} else {

		factor = 1.0 + (this._zoomEnd.y - this._zoomStart.y) * this.zoomSpeed;

		if (factor !== 1.0 && factor > 0.0) {

			this._eye.multiplyScalar(factor);

		}

		if (this.staticMoving) {

			this._zoomStart.copy(this._zoomEnd);

		} else {

			this._zoomStart.y += (this._zoomEnd.y - this._zoomStart.y) * this.dynamicDampingFactor;

		}

	}

}

public panCamera() {

		this._panCamera_mouseChange.copy(this._panEnd).sub(this._panStart);

		if (this._panCamera_mouseChange.lengthSq()) {

			this._panCamera_mouseChange.multiplyScalar(this._eye.length() * this.panSpeed);

			this._panCamera_pan.copy(this._eye).cross(this.object.up).setLength(this._panCamera_mouseChange.x);
			this._panCamera_pan.add(this._panCamera_objectUp.copy(this.object.up).setLength(this._panCamera_mouseChange.y));

			this.object.position.add(this._panCamera_pan);
			this.target.add(this._panCamera_pan);

			if (this.staticMoving) {

				this._panStart.copy(this._panEnd);

			} else {

				this._panStart.add(this._panCamera_mouseChange.subVectors(this._panEnd, this._panStart).multiplyScalar(this.dynamicDampingFactor));

			}

		}

	}

public checkDistances () {

	if (!this.noZoom || !this.noPan) {

		if (this._eye.lengthSq() > this.maxDistance * this.maxDistance) {

			this.object.position.addVectors(this.target, this._eye.setLength(this.maxDistance));
			this._zoomStart.copy(this._zoomEnd);

		}

		if (this._eye.lengthSq() < this.minDistance * this.minDistance) {

			this.object.position.addVectors(this.target, this._eye.setLength(this.minDistance));
			this._zoomStart.copy(this._zoomEnd);

		}

	}

};

public update() {

	this._eye.subVectors(this.object.position, this.target);

	if (!this.noRotate) {

		this.rotateCamera();

	}

	if (!this.noZoom) {

		this.zoomCamera();

	}

	if (!this.noPan) {

		this.panCamera();

	}

	this.object.position.addVectors(this.target, this._eye);

	this.checkDistances();

	this.object.lookAt(this.target);

	if (this.lastPosition.distanceToSquared(this.object.position) > this.EPS) {

		// this.domElement.dispatchEvent(this.changeEvent);

		this.lastPosition.copy(this.object.position);

	}

};

public reset () {

	this._state = STATE.NONE;
	this._prevState = STATE.NONE;

	this.target.copy(this.target0);
	this.object.position.copy(this.position0);
	this.object.up.copy(this.up0);

	this._eye.subVectors(this.object.position, this.target);

	this.object.lookAt(this.target);

	// this.domElement.dispatchEvent(this.changeEvent);

	this.lastPosition.copy(this.object.position);

};

// listeners

public keydown(event) {

	if (_this.enabled === false) return;

	window.removeEventListener('keydown', _this.keydown);

	_this._prevState = _this._state;

	if (_this._state !== STATE.NONE) {

		return;

	} else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {

		_this._state = STATE.ROTATE;

	} else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {

		_this._state = STATE.ZOOM;

	} else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {

		_this._state = STATE.PAN;

	}
	_this.update();
	_pipe.render();
}

public keyup(event) {

	if (_this.enabled === false) return;

	_this._state = _this._prevState;

	window.addEventListener('keydown', _this.keydown, false);
	_this.update();
	_pipe.render();
}

public mousedown(event) {

	if (_this.enabled === false) return;

	event.preventDefault();
	event.stopPropagation();

	if (_this._state === STATE.NONE) {

		_this._state = event.button;

	}

	if (_this._state === STATE.ROTATE && !_this.noRotate) {

		_this._moveCurr.copy(_this.getMouseOnCircle(event.pageX, event.pageY));
		_this._movePrev.copy(_this._moveCurr);

	} else if (_this._state === STATE.ZOOM && !_this.noZoom) {

		_this._zoomStart.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
		_this._zoomEnd.copy(_this._zoomStart);

	} else if (_this._state === STATE.PAN && !_this.noPan) {

		_this._panStart.copy(_this.getMouseOnScreen(event.pageX, event.pageY));
		_this._panEnd.copy(_this._panStart);

	}

	document.addEventListener('mousemove', _this.mousemove, false);
	document.addEventListener('mouseup', _this.mouseup, false);

	// this.domElement.dispatchEvent(this.startEvent);
	_this.update();
	_pipe.render();
}

public mousemove(event) {

	if (_this.enabled === false) return;

	event.preventDefault();
	event.stopPropagation();

	if (_this._state === STATE.ROTATE && !_this.noRotate) {

		_this._movePrev.copy(_this._moveCurr);
		_this._moveCurr.copy(_this.getMouseOnCircle(event.pageX, event.pageY));

	} else if (_this._state === STATE.ZOOM && !_this.noZoom) {

		this._zoomEnd.copy(this.getMouseOnScreen(event.pageX, event.pageY));

	} else if (_this._state === STATE.PAN && !_this.noPan) {

		_this._panEnd.copy(_this.getMouseOnScreen(event.pageX, event.pageY));

	}
	_this.update();
	_pipe.render();
}

public mouseup(event) {

	if (_this.enabled === false) return;

	event.preventDefault();
	event.stopPropagation();

	_this._state = STATE.NONE;

	document.removeEventListener('mousemove', this.mousemove);
	document.removeEventListener('mouseup', this.mouseup);
	// this.domElement.dispatchEvent(this.endEvent);
	_this.update();
	_pipe.render();
}

public mousewheel(event) {

	if (_this.enabled === false) return;

	event.preventDefault();
	event.stopPropagation();

	switch (event.deltaMode) {

		case 2:
			// Zoom in pages
			_this._zoomStart.y -= event.deltaY * 0.025;
			break;

		case 1:
			// Zoom in lines
			_this._zoomStart.y -= event.deltaY * 0.01;
			break;

		default:
			// undefined, 0, assume pixels
			_this._zoomStart.y -= event.deltaY * 0.00025;
			break;

	}

	// this.domElement.dispatchEvent(this.startEvent);
	// this.domElement.dispatchEvent(this.endEvent);
	_this.update();
	_pipe.render();
}

public touchstart(event) {

	if (_this.enabled === false) return;

	switch (event.touches.length) {

		case 1:
			_this._state = STATE.TOUCH_ROTATE;
			_this._moveCurr.copy(_this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
			_this._movePrev.copy(_this._moveCurr);
			break;

		default: // 2 or more
			_this._state = STATE.TOUCH_ZOOM_PAN;
			var dx = event.touches[0].pageX - event.touches[1].pageX;
			var dy = event.touches[0].pageY - event.touches[1].pageY;
			_this._touchZoomDistanceEnd = _this._touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

			var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
			var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
			_this._panStart.copy(_this.getMouseOnScreen(x, y));
			_this._panEnd.copy(_this._panStart);
			break;

	}

	// this.domElement.dispatchEvent(this.startEvent);
	_this.update();
	_pipe.render();
}

public touchmove(event) {

	if (_this.enabled === false) return;

	event.preventDefault();
	event.stopPropagation();

	switch (event.touches.length) {

		case 1:
			_this._movePrev.copy(_this._moveCurr);
			_this._moveCurr.copy(_this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
			break;

		default: // 2 or more
			var dx = event.touches[0].pageX - event.touches[1].pageX;
			var dy = event.touches[0].pageY - event.touches[1].pageY;
			_this._touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

			var x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
			var y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
			_this._panEnd.copy(_this.getMouseOnScreen(x, y));
			break;

	}
	_this.update();
	_pipe.render();
}

public touchend(event) {

	if (_this.enabled === false) return;

	switch (event.touches.length) {

		case 0:
			_this._state = STATE.NONE;
			break;

		case 1:
			_this._state = STATE.TOUCH_ROTATE;
			_this._moveCurr.copy(this.getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
			_this._movePrev.copy(this._moveCurr);
			break;

	}

	// this.domElement.dispatchEvent(this.endEvent);
	_this.update();
	_pipe.render();
}

public contextmenu(event) {

	if (_this.enabled === false) return;

	event.preventDefault();
	_this.update();
	_pipe.render();
}

 public dispose() {

	this.domElement.removeEventListener('contextmenu', this.contextmenu, false);
	this.domElement.removeEventListener('mousedown', this.mousedown, false);
	this.domElement.removeEventListener('wheel', this.mousewheel, false);

	this.domElement.removeEventListener('touchstart', this.touchstart, false);
	this.domElement.removeEventListener('touchend', this.touchend, false);
	this.domElement.removeEventListener('touchmove', this.touchmove, false);

	document.removeEventListener('mousemove', this.mousemove, false);
	document.removeEventListener('mouseup', this.mouseup, false);

	window.removeEventListener('keydown', this.keydown, false);
	window.removeEventListener('keyup', this.keyup, false);

}

}
