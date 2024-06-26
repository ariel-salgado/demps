import type { PopupFields, FormFields } from '$lib/types';

import { z } from 'zod';

/**
 * @Environment
 * Form fields for feature properties edition
 */
export const popupFields: PopupFields = {
	id: {
		type: 'text',
		defaultValue: '',
		attributes: {
			readonly: true
		}
	},
	nameID: {
		type: 'text',
		defaultValue: '',
		attributes: {}
	},
	zoneType: {
		type: 'select',
		defaultValue: '',
		attributes: {},
		options: ['initial', 'flood', 'safe']
	},
	stroke: {
		type: 'color',
		defaultValue: '#3388ff',
		attributes: {}
	},
	'stroke-width': {
		type: 'number',
		defaultValue: 3,
		attributes: {
			min: 0,
			step: 1
		}
	},
	'stroke-opacity': {
		type: 'number',
		defaultValue: 1,
		attributes: {
			min: 0,
			max: 1,
			step: 0.1
		}
	},
	fill: {
		type: 'color',
		defaultValue: '#3388ff',
		attributes: {}
	},
	'fill-opacity': {
		type: 'number',
		defaultValue: 0.2,
		attributes: {
			min: 0,
			max: 1,
			step: 0.1
		}
	}
} as const;

export function getValidationSchema() {
	const validations: Record<string, z.ZodType> = {};
	const stack = Object.entries(parametersFormFields);

	while (stack.length) {
		// @ts-expect-error - stack has an iterator.
		const [key, value] = stack.pop();

		if (Array.isArray(value)) {
			for (const item of value) {
				if (
					typeof item === 'object' &&
					item !== null &&
					'validation' in item &&
					'attributes' in item
				) {
					const {
						validation,
						attributes: { name }
					} = item;
					if (name) {
						validations[name] = validation;
					}
				} else {
					// @ts-expect-error - The value is too complex to be typed.
					stack.push(...Object.entries(item).map(([k, v]) => [`${key}.${k}`, v]));
				}
			}
		} else if (typeof value === 'object' && value !== null) {
			// @ts-expect-error - The value is too complex to be typed.
			stack.push(...Object.entries(value).map(([k, v]) => [`${key}.${k}`, v]));
		}
	}

	const schema = z.object(validations);

	return schema;
}

/**
 * @Parameters
 * Parameters form fields
 */
export const parametersFormFields: FormFields = {
	general: [
		{
			label: 'Duration',
			description: 'Duración de la simulación',
			type: 'input',
			attributes: {
				name: 'duration',
				type: 'number',
				placeholder: 'Ingrese la duración de la simulación'
			}
		},
		{
			label: 'Calibration',
			description: 'Calibración de la simulación',
			type: 'input',
			attributes: {
				name: 'calibration',
				type: 'number',
				placeholder: 'Ingrese la calibración de la simulación'
			}
		},
		{
			label: 'Quad Size',
			description: 'Tamaño de los cuadrantes',
			type: 'input',
			attributes: {
				name: 'quadSize',
				type: 'number',
				placeholder: 'Ingrese el tamaño de los cuadrantes'
			}
		},
		{
			label: 'Close Enough',
			description: 'Distancia de cercanía',
			type: 'input',
			attributes: {
				name: 'closeEnough',
				type: 'number',
				placeholder: 'Ingrese la distancia de cercanía'
			}
		},
		{
			label: 'Random Walkway Radius',
			description: 'Radio de la caminata aleatoria',
			type: 'input',
			attributes: {
				name: 'randomWalkwayRadius',
				type: 'number',
				placeholder: 'Ingrese el radio de la caminata aleatoria'
			}
		},
		{
			label: 'Attraction Radius',
			description: 'Radio de atracción',
			type: 'input',
			attributes: {
				name: 'attractionRadius',
				type: 'number',
				placeholder: 'Ingrese el radio de atracción'
			}
		},
		{
			label: 'Delta T',
			description: 'Delta T',
			type: 'input',
			attributes: {
				name: 'deltaT',
				type: 'number',
				placeholder: 'Ingrese el delta T'
			}
		},
		{
			label: 'Threads',
			description: 'Cantidad de hilos',
			type: 'input',
			attributes: {
				name: 'threads',
				type: 'number',
				placeholder: 'Ingrese la cantidad de hilos'
			}
		},
		{
			label: 'Flood Model Enable',
			description: 'Modelo de inundación',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'floodModelEnable',
				placeholder: 'Seleccione el modelo de inundación'
			}
		},
		{
			label: 'Density Model Enable',
			description: 'Modelo de densidad',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'densityModelEnable',
				placeholder: 'Seleccione el modelo de densidad'
			}
		},
		{
			label: 'Panic Model Enable',
			description: 'Modelo de pánico',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'panicModelEnable',
				placeholder: 'Seleccione el modelo de pánico'
			}
		},
		{
			label: 'Elevation Model Enable',
			description: 'Modelo de elevación',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'elevationModelEnable',
				placeholder: 'Seleccione el modelo de elevación'
			}
		},
		{
			label: 'Debris Model Enable',
			description: 'Modelo de escombros',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'debrisModelEnable',
				placeholder: 'Seleccione el modelo de escombros'
			}
		},
		{
			label: 'City',
			description: 'Ciudad',
			type: 'input',
			attributes: {
				name: 'city',
				type: 'text',
				placeholder: 'Ingrese la ciudad'
			}
		},
		{
			label: 'Description',
			description: 'Descripción',
			type: 'input',
			attributes: {
				name: 'description',
				type: 'text',
				placeholder: 'Ingrese la descripción'
			}
		},
		{
			label: 'Sampling Interval',
			description: 'Intervalo de muestreo',
			type: 'input',
			attributes: {
				name: 'samplingInterval',
				type: 'number',
				placeholder: 'Ingrese el intervalo de muestreo'
			}
		},
		{
			label: 'Base Dir Sim',
			description: 'Directorio base de la simulación',
			type: 'input',
			attributes: {
				name: 'baseDirSim',
				type: 'text',
				placeholder: 'Ingrese el directorio base de la simulación'
			}
		}
	],
	input: [
		{
			label: 'Directory',
			description: 'Directorio',
			type: 'input',
			attributes: {
				name: 'input.directory',
				type: 'text',
				placeholder: 'Ingrese el directorio'
			}
		},
		{
			label: 'Map',
			description: 'Mapa',
			type: 'input',
			attributes: {
				name: 'input.map',
				type: 'text',
				placeholder: 'Ingrese el mapa'
			}
		},
		{
			label: 'Zones',
			description: 'Zonas',
			type: 'input',
			attributes: {
				name: 'input.zones',
				type: 'text',
				placeholder: 'Ingrese las zonas'
			}
		}
	],
	output: [
		{
			label: 'Progress Bar',
			description: 'Barra de progreso',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.progressBar',
				placeholder: 'Seleccione la barra de progreso'
			}
		},
		{
			label: 'Interval',
			description: 'Intervalo',
			type: 'input',
			attributes: {
				name: 'output.interval',
				type: 'number',
				placeholder: 'Ingrese el intervalo'
			}
		},
		{
			label: 'Directory',
			description: 'Directorio',
			type: 'input',
			attributes: {
				name: 'output.directory',
				type: 'text',
				placeholder: 'Ingrese el directorio'
			}
		},
		{
			label: 'Agents Out',
			description: 'Salida de agentes',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.agents-out',
				placeholder: 'Seleccione la salida de agentes'
			}
		},
		{
			label: 'Agents Path',
			description: 'Directorio de agentes',
			type: 'input',
			attributes: {
				name: 'output.agents-path',
				type: 'text',
				placeholder: 'Ingrese el directorio de agentes'
			}
		},
		{
			label: 'Agents Precision',
			description: 'Precisión de agentes',
			type: 'input',
			attributes: {
				name: 'output.agents-precision',
				type: 'number',
				placeholder: 'Ingrese la precisión de agentes'
			}
		},
		{
			label: 'Agents Sufix',
			description: 'Sufijo de agentes',
			type: 'input',
			attributes: {
				name: 'output.agents-sufix',
				type: 'text',
				placeholder: 'Ingrese el sufijo de agentes'
			}
		},
		{
			label: 'Stats Out',
			description: 'Salida de estadísticas',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.stats-out',
				placeholder: 'Seleccione la salida de estadísticas'
			}
		},
		{
			label: 'Stats Interval',
			description: 'Intervalo de estadísticas',
			type: 'input',
			attributes: {
				name: 'output.stats-interval',
				type: 'number',
				placeholder: 'Ingrese el intervalo de estadísticas'
			}
		},
		{
			label: 'Stats Path',
			description: 'Directorio de estadísticas',
			type: 'input',
			attributes: {
				name: 'output.stats-path',
				type: 'text',
				placeholder: 'Ingrese el directorio de estadísticas'
			}
		},
		{
			label: 'Anim Config',
			description: 'Nombre de archivo de configuración de animación',
			type: 'input',
			attributes: {
				name: 'output.anim-config',
				type: 'text',
				placeholder: 'Ingrese nombre de archivo de configuración de animación'
			}
		},
		{
			label: 'Heat Map Out',
			description: 'Salida de mapa de calor',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.heatMap-out',
				placeholder: 'Seleccione la salida de mapa de calor'
			}
		},
		{
			label: 'Heat Map Size',
			description: 'Tamaño del mapa de calor',
			type: 'input',
			attributes: {
				name: 'output.heatMap-size',
				type: 'number',
				placeholder: 'Ingrese el tamaño del mapa de calor'
			}
		},
		{
			label: 'Heat Map Interval',
			description: 'Intervalo del mapa de calor',
			type: 'input',
			attributes: {
				name: 'output.heatMap-interval',
				type: 'number',
				placeholder: 'Ingrese el intervalo del mapa de calor'
			}
		},
		{
			label: 'Heat Map Path',
			description: 'Directorio del mapa de calor',
			type: 'input',
			attributes: {
				name: 'output.heatMap-path',
				type: 'text',
				placeholder: 'Ingrese el directorio del mapa de calor'
			}
		}
	],
	floodParams: [
		{
			label: 'Direction',
			description: 'Dirección',
			type: 'input',
			attributes: {
				name: 'floodParams.direction',
				type: 'text',
				placeholder: 'Ingrese la dirección'
			}
		},
		{
			label: 'Sample State Interval',
			description: 'Intervalo de muestreo de estado',
			type: 'input',
			attributes: {
				name: 'floodParams.sampleStateInterval',
				type: 'number',
				placeholder: 'Ingrese el intervalo de muestreo de estado'
			}
		},
		{
			label: 'Arrival Time',
			description: 'Tiempo de llegada',
			type: 'input',
			attributes: {
				name: 'floodParams.arrivalTime',
				type: 'number',
				placeholder: 'Ingrese el tiempo de llegada'
			}
		},
		{
			label: 'Speed Water Prop',
			description: 'Velocidad del agua proporcional',
			type: 'input',
			attributes: {
				name: 'floodParams.speedWaterProp',
				type: 'number',
				placeholder: 'Ingrese la velocidad del agua proporcional'
			}
		},
		{
			label: 'Speed Water Level',
			description: 'Velocidad del agua nivel',
			type: 'input',
			attributes: {
				name: 'floodParams.speedWaterLevel',
				type: 'number',
				placeholder: 'Ingrese la velocidad del agua nivel'
			}
		},
		{
			label: 'Critical Level',
			description: 'Nivel crítico',
			type: 'input',
			attributes: {
				name: 'floodParams.criticalLevel',
				type: 'number',
				placeholder: 'Ingrese el nivel crítico'
			}
		},
		{
			label: 'Min Speed Factor',
			description: 'Factor de velocidad mínimo',
			type: 'input',
			attributes: {
				name: 'floodParams.minSpeedFactor',
				type: 'number',
				placeholder: 'Ingrese el factor de velocidad mínimo'
			}
		},
		{
			label: 'Images Enable',
			description: 'Habilitación de imágenes',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'floodParams.imagesEnable',
				placeholder: 'Seleccione la habilitación de imágenes'
			}
		},
		{
			label: 'Images Dir',
			description: 'Directorio de imágenes',
			type: 'input',
			attributes: {
				name: 'floodParams.imagesDir',
				type: 'text',
				placeholder: 'Ingrese el directorio de imágenes'
			}
		},
		{
			label: 'State Enable',
			description: 'Habilitación de estado',
			type: 'select',
			options: [
				{
					value: true,
					label: 'Habilitado'
				},
				{
					value: false,
					label: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'floodParams.stateEnable',
				placeholder: 'Seleccione la habilitación de estado'
			}
		},
		{
			label: 'State Dir',
			description: 'Directorio de estado',
			type: 'input',
			attributes: {
				name: 'floodParams.stateDir',
				type: 'text',
				placeholder: 'Ingrese el directorio de estado'
			}
		}
	],
	densityParams: [
		{
			label: 'Min Density',
			description: 'Densidad mínima',
			type: 'input',
			attributes: {
				name: 'densityParams.minDensity',
				type: 'number',
				placeholder: 'Ingrese la densidad mínima'
			}
		},
		{
			label: 'Max Density',
			description: 'Densidad máxima',
			type: 'input',
			attributes: {
				name: 'densityParams.maxDensity',
				type: 'number',
				placeholder: 'Ingrese la densidad máxima'
			}
		},
		{
			label: 'Min Velocity',
			description: 'Velocidad mínima',
			type: 'input',
			attributes: {
				name: 'densityParams.minVelocity',
				type: 'number',
				placeholder: 'Ingrese la velocidad mínima'
			}
		}
	],
	agents: {
		residents: [
			{
				label: 'Model',
				description: 'Modelo',
				type: 'input',
				attributes: {
					name: 'agents.0.model',
					type: 'text',
					placeholder: 'Ingrese el modelo',
					value: 'Residents',
					readonly: true
				}
			},
			{
				label: 'Number',
				description: 'Número',
				type: 'input',
				attributes: {
					name: 'agents.0.number',
					type: 'number',
					placeholder: 'Ingrese el número'
				}
			},
			{
				label: 'Tau',
				description: 'Tau',
				type: 'input',
				attributes: {
					name: 'agents.0.responseTime.tau',
					type: 'number',
					placeholder: 'Ingrese el tau'
				}
			},
			{
				label: 'Sigma',
				description: 'Sigma',
				type: 'input',
				attributes: {
					name: 'agents.0.responseTime.sigma',
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				label: 'Mean Time Take Phone',
				description: 'Tiempo medio de toma de teléfono',
				type: 'input',
				attributes: {
					name: 'agents.0.phoneUse.meanTimeTakePhone',
					type: 'number',
					placeholder: 'Ingrese el tiempo medio de toma de teléfono'
				}
			},
			{
				label: 'Prob Phone Use Const',
				description: 'Probabilidad de uso de teléfono constante',
				type: 'input',
				attributes: {
					name: 'agents.0.phoneUse.probPhoneUseConst',
					type: 'number',
					placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
				}
			},
			{
				label: 'G0 Prob',
				description: 'Probabilidad G0',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G0.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G0'
				}
			},
			{
				label: 'G0 Min Speed',
				description: 'Velocidad mínima G0',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G0.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G0'
				}
			},
			{
				label: 'G0 Max Speed',
				description: 'Velocidad máxima G0',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G0.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G0'
				}
			},
			{
				label: 'G1 Prob',
				description: 'Probabilidad G1',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G1.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G1'
				}
			},
			{
				label: 'G1 Min Speed',
				description: 'Velocidad mínima G1',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G1.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G1'
				}
			},
			{
				label: 'G1 Max Speed',
				description: 'Velocidad máxima G1',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G1.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G1'
				}
			},
			{
				label: 'G2 Prob',
				description: 'Probabilidad G2',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G2.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G2'
				}
			},
			{
				label: 'G2 Min Speed',
				description: 'Velocidad mínima G2',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G2.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G2'
				}
			},
			{
				label: 'G2 Max Speed',
				description: 'Velocidad máxima G2',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G2.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G2'
				}
			},
			{
				label: 'G3 Prob',
				description: 'Probabilidad G3',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G3.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G3'
				}
			},
			{
				label: 'G3 Min Speed',
				description: 'Velocidad mínima G3',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G3.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G3'
				}
			},
			{
				label: 'G3 Max Speed',
				description: 'Velocidad máxima G3',
				type: 'input',
				attributes: {
					name: 'agents.0.ageRange.G3.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G3'
				}
			},
			{
				label: 'Time Relax',
				description: 'Tiempo de relajación',
				type: 'input',
				attributes: {
					name: 'agents.0.SFM.timeRelax',
					type: 'number',
					placeholder: 'Ingrese el tiempo de relajación'
				}
			},
			{
				label: 'Sigma',
				description: 'Sigma',
				type: 'input',
				attributes: {
					name: 'agents.0.SFM.sigma',
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				label: 'Repulsive Force Agents',
				description: 'Fuerza repulsiva de agentes',
				type: 'input',
				attributes: {
					name: 'agents.0.SFM.repulsiveForceAgents',
					type: 'number',
					placeholder: 'Ingrese la fuerza repulsiva de agentes'
				}
			},
			{
				label: 'Cos Phi',
				description: 'Cos phi',
				type: 'input',
				attributes: {
					name: 'agents.0.SFM.cosphi',
					type: 'number',
					placeholder: 'Ingrese el cos phi'
				}
			},
			{
				label: 'Emotion Threshold',
				description: 'Umbral de emoción',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.emotionThreshold',
					type: 'number',
					placeholder: 'Ingrese el umbral de emoción'
				}
			},
			{
				label: 'Prob Infected To Recovered',
				description: 'Probabilidad de infectado a recuperado',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.probInfectedToRecovered',
					type: 'number',
					placeholder: 'Ingrese la probabilidad de infectado a recuperado'
				}
			},
			{
				label: 'Prob Recovered To Susceptible',
				description: 'Probabilidad de recuperado a susceptible',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.probRecoveredToSusceptible',
					type: 'number',
					placeholder: 'Ingrese la probabilidad de recuperado a susceptible'
				}
			},
			{
				label: 'Mean Time In Infected',
				description: 'Tiempo medio en infectado',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.meanTimeInInfected',
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en infectado'
				}
			},
			{
				label: 'Sd Time In Infected',
				description: 'Desviación estándar de tiempo en infectado',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.sdTimeInInfected',
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en infectado'
				}
			},
			{
				label: 'Mean Time In Recovered',
				description: 'Tiempo medio en recuperado',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.meanTimeInRecovered',
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en recuperado'
				}
			},
			{
				label: 'Sd Time In Recovered',
				description: 'Desviación estándar de tiempo en recuperado',
				type: 'input',
				attributes: {
					name: 'agents.0.panicModel.sdTimeInRecovered',
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en recuperado'
				}
			}
		],
		visitors: [
			{
				label: 'Model',
				description: 'Modelo',
				type: 'input',
				attributes: {
					name: 'agents.1.model',
					type: 'text',
					placeholder: 'Ingrese el modelo',
					value: 'Visitors',
					readonly: true
				}
			},
			{
				label: 'Number',
				description: 'Número',
				type: 'input',
				attributes: {
					name: 'agents.1.number',
					type: 'number',
					placeholder: 'Ingrese el número'
				}
			},
			{
				label: 'Tau',
				description: 'Tau',
				type: 'input',
				attributes: {
					name: 'agents.1.responseTime.tau',
					type: 'number',
					placeholder: 'Ingrese el tau'
				}
			},
			{
				label: 'Sigma',
				description: 'Sigma',
				type: 'input',
				attributes: {
					name: 'agents.1.responseTime.sigma',
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				label: 'Mean Time Take Phone',
				description: 'Tiempo medio de toma de teléfono',
				type: 'input',
				attributes: {
					name: 'agents.1.phoneUse.meanTimeTakePhone',
					type: 'number',
					placeholder: 'Ingrese el tiempo medio de toma de teléfono'
				}
			},
			{
				label: 'Prob Phone Use Const',
				description: 'Probabilidad de uso de teléfono constante',
				type: 'input',
				attributes: {
					name: 'agents.1.phoneUse.probPhoneUseConst',
					type: 'number',
					placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
				}
			},
			{
				label: 'G0 Prob',
				description: 'Probabilidad G0',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G0.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G0'
				}
			},
			{
				label: 'G0 Min Speed',
				description: 'Velocidad mínima G0',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G0.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G0'
				}
			},
			{
				label: 'G0 Max Speed',
				description: 'Velocidad máxima G0',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G0.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G0'
				}
			},
			{
				label: 'G1 Prob',
				description: 'Probabilidad G1',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G1.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G1'
				}
			},
			{
				label: 'G1 Min Speed',
				description: 'Velocidad mínima G1',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G1.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G1'
				}
			},
			{
				label: 'G1 Max Speed',
				description: 'Velocidad máxima G1',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G1.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G1'
				}
			},
			{
				label: 'G2 Prob',
				description: 'Probabilidad G2',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G2.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G2'
				}
			},
			{
				label: 'G2 Min Speed',
				description: 'Velocidad mínima G2',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G2.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G2'
				}
			},
			{
				label: 'G2 Max Speed',
				description: 'Velocidad máxima G2',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G2.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G2'
				}
			},
			{
				label: 'G3 Prob',
				description: 'Probabilidad G3',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G3.prob',
					type: 'number',
					placeholder: 'Ingrese la probabilidad G3'
				}
			},
			{
				label: 'G3 Min Speed',
				description: 'Velocidad mínima G3',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G3.minSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G3'
				}
			},
			{
				label: 'G3 Max Speed',
				description: 'Velocidad máxima G3',
				type: 'input',
				attributes: {
					name: 'agents.1.ageRange.G3.maxSpeed',
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G3'
				}
			},
			{
				label: 'Time Relax',
				description: 'Tiempo de relajación',
				type: 'input',
				attributes: {
					name: 'agents.1.SFM.timeRelax',
					type: 'number',
					placeholder: 'Ingrese el tiempo de relajación'
				}
			},
			{
				label: 'Sigma',
				description: 'Sigma',
				type: 'input',
				attributes: {
					name: 'agents.1.SFM.sigma',
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				label: 'Repulsive Force Agents',
				description: 'Fuerza repulsiva de agentes',
				type: 'input',
				attributes: {
					name: 'agents.1.SFM.repulsiveForceAgents',
					type: 'number',
					placeholder: 'Ingrese la fuerza repulsiva de agentes'
				}
			},
			{
				label: 'Cos Phi',
				description: 'Cos phi',
				type: 'input',
				attributes: {
					name: 'agents.1.SFM.cosphi',
					type: 'number',
					placeholder: 'Ingrese el cos phi'
				}
			},
			{
				label: 'Emotion Threshold',
				description: 'Umbral de emoción',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.emotionThreshold',
					type: 'number',
					placeholder: 'Ingrese el umbral de emoción'
				}
			},
			{
				label: 'Prob Infected To Recovered',
				description: 'Probabilidad de infectado a recuperado',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.probInfectedToRecovered',
					type: 'number',
					placeholder: 'Ingrese la probabilidad de infectado a recuperado'
				}
			},
			{
				label: 'Prob Recovered To Susceptible',
				description: 'Probabilidad de recuperado a susceptible',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.probRecoveredToSusceptible',
					type: 'number',
					placeholder: 'Ingrese la probabilidad de recuperado a susceptible'
				}
			},
			{
				label: 'Mean Time In Infected',
				description: 'Tiempo medio en infectado',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.meanTimeInInfected',
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en infectado'
				}
			},
			{
				label: 'Sd Time In Infected',
				description: 'Desviación estándar de tiempo en infectado',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.sdTimeInInfected',
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en infectado'
				}
			},
			{
				label: 'Mean Time In Recovered',
				description: 'Tiempo medio en recuperado',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.meanTimeInRecovered',
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en recuperado'
				}
			},
			{
				label: 'Sd Time In Recovered',
				description: 'Desviación estándar de tiempo en recuperado',
				type: 'input',
				attributes: {
					name: 'agents.1.panicModel.sdTimeInRecovered',
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en recuperado'
				}
			}
		]
	}
} as const;
