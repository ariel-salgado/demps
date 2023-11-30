<script lang="ts">
	import { get } from 'svelte/store';
	import { getContext } from 'svelte';
	import { EnvStore } from '$lib/utils/stores';
	import { key, type MapContext } from '$lib/components/leaflet';

	import '@geoman-io/leaflet-geoman-free';
	import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

	const { getMap, getLeaflet } = getContext<MapContext>(key);

	let L = getLeaflet();
	let map: L.Map = getMap();

	let overlay: L.Control.Layers = L.control.layers();
	let featureGroup: L.FeatureGroup = L.featureGroup();

	map.addControl(overlay);
	map.addLayer(featureGroup);

	map.pm.setGlobalOptions({
		allowSelfIntersection: false,
		allowSelfIntersectionEdit: false,
		layerGroup: featureGroup
	});

	map.pm.addControls({
		position: 'topleft',
		drawText: false,
		drawMarker: false,
		cutPolygon: false,
		drawPolyline: false,
		drawCircleMarker: false
	});

	map.pm.setLang('es');

	const getLayerId = (layer: L.Layer) => {
		// @ts-expect-error - Bad typings
		if (layer.feature) {
			// @ts-expect-error - Bad typings
			return layer.feature.properties.nameID || layer.feature.id;
		}

		// @ts-expect-error - Bad typings
		return layer.pm.getLayers()[0].feature.properties.id || layer.pm.getLayers()[0].feature.id;
	};

	const addEvents = (layer: L.Layer) => {
		layer.on('pm:edit', ({ layer }) => {
			// @ts-expect-error - Bad typings
			const edited = layer.toGeoJSON();

			EnvStore.update((current) => {
				current.data.features = current.data.features.map((feature) => {
					if (feature.id === edited.id) {
						return edited;
					}
					return feature;
				});
				current.trigger = 'map';

				return {
					...current
				};
			});
		});

		layer.on('pm:dragend', ({ layer }) => {
			// @ts-expect-error - Bad typings
			const dragged = layer.toGeoJSON();

			EnvStore.update((current) => {
				current.data.features = current.data.features.map((feature) => {
					if (feature.id === dragged.id) {
						return dragged;
					}
					return feature;
				});
				current.trigger = 'map';

				return {
					...current
				};
			});
		});

		layer.on('pm:rotate', ({ layer }) => {
			// @ts-expect-error - Bad typings
			const rotated = layer.toGeoJSON();

			EnvStore.update((current) => {
				current.data.features = current.data.features.map((feature) => {
					if (feature.id === rotated.id) {
						return rotated;
					}
					return feature;
				});
				current.trigger = 'map';

				return {
					...current
				};
			});
		});
	};

	const loadFeatures = () => {
		featureGroup.eachLayer((layer) => {
			overlay.removeLayer(layer);
		});
		featureGroup.clearLayers();

		const { data } = get(EnvStore);
		L.geoJSON(data, {
			style: function (feature) {
				// Default attributes
				const defaultAttributes = {
					stroke: '#3388ff',
					'stroke-width': 3,
					'stroke-opacity': 1,
					fill: '#3388ff',
					'fill-opacity': 0.2
				};

				const featureProperties = feature?.properties || {};

				const attributes = {
					...defaultAttributes,
					...featureProperties
				};

				return {
					smoothFactor: 1.5,
					color: attributes.stroke,
					weight: attributes['stroke-width'],
					opacity: attributes['stroke-opacity'],
					fillColor: attributes.fill,
					fillOpacity: attributes['fill-opacity']
				};
			},
			onEachFeature: (_, layer) => {
				addEvents(layer);

				featureGroup.addLayer(layer);
				overlay.addOverlay(layer, getLayerId(layer));
			}
		});
	};

	const layerToPolygon = (layer: L.Layer) => {
		if (layer instanceof L.Polygon) {
			const coordinates = layer.getLatLngs();
			return new L.Polygon(coordinates);
		}

		if (layer instanceof L.Circle) {
			const radius = layer.getRadius();
			const coordinates = layer.getLatLng();
			return L.PM.Utils.circleToPolygon(new L.Circle(coordinates, radius), 18);
		}

		return new L.Polygon([]);
	};

	const syncMapOnDelete = () => {
		// @ts-expect-error - Bad typings
		const currentIDs = featureGroup.toGeoJSON().features.map((feature) => feature.id);
		const storedIDs = get(EnvStore).data.features.map((feature) => feature.id);

		const deletedIDs = currentIDs.filter((id: string) => !storedIDs.includes(id));

		deletedIDs.forEach((id: string) => {
			featureGroup.eachLayer((layer) => {
				const deletedID = getLayerId(layer);

				if (deletedID === id) {
					overlay.removeLayer(layer);
					featureGroup.removeLayer(layer);
				}
			});
		});
	};

	map.on('pm:create', ({ layer }) => {
		featureGroup.removeLayer(layer);

		let polygon = layerToPolygon(layer).toGeoJSON();
		const createdID = crypto.randomUUID();
		polygon = { id: createdID, ...polygon };

		const created = L.geoJSON(polygon);

		addEvents(created);

		featureGroup.addLayer(created);
		overlay.addOverlay(created, getLayerId(created));

		EnvStore.update((current) => {
			// @ts-expect-error - Bad typings
			current.data.features = [...current.data.features, created.toGeoJSON().features[0]];
			current.trigger = 'map';

			return {
				...current
			};
		});
	});

	map.on('pm:remove', ({ layer }) => {
		// @ts-expect-error - Bad typings
		const removed = layer.feature;

		overlay.removeLayer(layer);
		featureGroup.removeLayer(layer);

		EnvStore.update((current) => {
			current.data.features = current.data.features.filter((feature) => {
				return feature?.id !== removed.id;
			});
			current.trigger = 'map';

			return {
				...current
			};
		});
	});

	loadFeatures();

	EnvStore.subscribe(({ data, trigger }) => {
		if (map) {
			if (trigger === 'fileUploader') {
				loadFeatures();
			}

			if (trigger === 'editor:doc') {
				syncMapOnDelete();
			}
		}
	});
</script>
