import PointerInteraction from "ol/interaction/Pointer";
import {Layer} from "ol/layer";
import {Source} from "ol/source";

interface Options {
  layers?: Layer<Source>[];
}

export const DragInteraction = /*@__PURE__*/(function (PointerInteraction) {
  function DragInteraction(options: Options = {}) {
    PointerInteraction.call(this, {
      handleDownEvent: handleDownEvent,
      handleDragEvent: handleDragEvent,
      handleMoveEvent: handleMoveEvent,
      handleUpEvent: handleUpEvent
    });

    /**
     * @type {import("../src/ol/coordinate.js").Coordinate}
     * @private
     */
    this.coordinate_ = null;

    /**
     * @type {string|undefined}
     * @private
     */
    this.cursor_ = 'move';

    /**
     * @type {Feature}
     * @private
     */
    this.feature_ = null;

    /**
     * @type {string|undefined}
     * @private
     */
    this.previousCursor_ = undefined;

    if(options.layers) {
      /**
       * Layers enabled for dragging
       * Layer<Source>
       */
      this.layerFilter = (layer: Layer<Source>) => options.layers.includes(layer);
    }
  }

  if ( PointerInteraction ) DragInteraction.__proto__ = PointerInteraction;
  DragInteraction.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );
  DragInteraction.prototype.constructor = DragInteraction;

  return DragInteraction;
}(PointerInteraction));


/**
 * @param {import("../src/ol/MapBrowserEvent.js").default} evt Map browser event.
 * @return {boolean} `true` to start the drag sequence.
 */
function handleDownEvent(evt) {
  const map = evt.map;

  const feature = map.forEachFeatureAtPixel(
    evt.pixel,
    feature => feature,
    {layerFilter: this.layerFilter}
  );

  if (feature) {
    this.coordinate_ = evt.coordinate;
    this.feature_ = feature;
  }

  return !!feature;
}


/**
 * @param {import("../src/ol/MapBrowserEvent.js").default} evt Map browser event.
 */
function handleDragEvent(evt) {
  const deltaX = evt.coordinate[0] - this.coordinate_[0];
  const deltaY = evt.coordinate[1] - this.coordinate_[1];

  const geometry = this.feature_.getGeometry();
  geometry.translate(deltaX, deltaY);

  this.coordinate_[0] = evt.coordinate[0];
  this.coordinate_[1] = evt.coordinate[1];
}


/**
 * @param {import("../src/ol/MapBrowserEvent.js").default} evt Event.
 */
function handleMoveEvent(evt) {
  if (this.cursor_) {
    const map = evt.map;
    const feature = map.forEachFeatureAtPixel(
      evt.pixel,
      feature => feature,
      {layerFilter: this.layerFilter}
    );
    const element = evt.map.getTargetElement();
    if (feature) {
      if (element.style.cursor != this.cursor_) {
        this.previousCursor_ = element.style.cursor;
        element.style.cursor = this.cursor_;
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
}


/**
 * @return {boolean} `false` to stop the drag sequence.
 */
function handleUpEvent() {
  this.coordinate_ = null;
  this.feature_ = null;
  return false;
}
