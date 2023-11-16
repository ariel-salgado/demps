type TElement =
	| {
			name: string;
			element: 'input';
			field: string;
			attributes: {
				type: 'text' | 'number';
				placeholder?: string;
				value?: string;
			};
			hint?: string;
	  }
	| {
			name: string;
			element: 'select';
			field: string;
			attributes: {
				placeholder?: string;
				value?: string;
				options: Array<{
					value: string | number | boolean;
					text: string;
				}>;
			};
			hint?: string;
	  };

type TConfigurationFormFields = {
	[key: string]: Array<TElement>;
};

export const configurationFormFields: TConfigurationFormFields = {
	general: [
		{
			name: 'Duration',
			element: 'input',
			field: 'duration',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la duración de la simulación'
			},
			hint: 'Duración de la simulación'
		},
		{
			name: 'Calibration',
			element: 'input',
			field: 'calibration',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la calibración de la simulación'
			},
			hint: 'Calibración de la simulación'
		},
		{
			name: 'Quad Size',
			element: 'input',
			field: 'quadSize',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tamaño de los cuadrantes'
			},
			hint: 'Tamaño de los cuadrantes'
		},
		{
			name: 'Close Enough',
			element: 'input',
			field: 'closeEnough',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la distancia de cercanía'
			},
			hint: 'Distancia de cercanía'
		},
		{
			name: 'Random Walkway Radius',
			element: 'input',
			field: 'randomWalkwayRadius',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el radio de la caminata aleatoria'
			},
			hint: 'Radio de la caminata aleatoria'
		},
		{
			name: 'Attraction Radius',
			element: 'input',
			field: 'attractionRadius',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el radio de atracción'
			},
			hint: 'Radio de atracción'
		},
		{
			name: 'Delta T',
			element: 'input',
			field: 'deltaT',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el delta T'
			},
			hint: 'Delta T'
		},
		{
			name: 'Threads',
			element: 'input',
			field: 'threads',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la cantidad de hilos'
			},
			hint: 'Cantidad de hilos'
		},
		{
			name: 'Flood Model Enable',
			element: 'select',
			field: 'floodModelEnable',
			attributes: {
				placeholder: 'Seleccione el modelo de inundación',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de inundación'
		},
		{
			name: 'Density Model Enable',
			element: 'select',
			field: 'densityModelEnable',
			attributes: {
				placeholder: 'Seleccione el modelo de densidad',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de densidad'
		},
		{
			name: 'Panic Model Enable',
			element: 'select',
			field: 'panicModelEnable',
			attributes: {
				placeholder: 'Ingrese el modelo de pánico',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de pánico'
		},
		{
			name: 'Elevation Model Enable',
			element: 'select',
			field: 'elevationModelEnable',
			attributes: {
				placeholder: 'Ingrese el modelo de elevación',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de elevación'
		},
		{
			name: 'Debris Model Enable',
			element: 'select',
			field: 'debrisModelEnable',
			attributes: {
				placeholder: 'Ingrese el modelo de escombros',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Modelo de escombros'
		},
		{
			name: 'City',
			element: 'input',
			field: 'city',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese la ciudad'
			},
			hint: 'Ciudad'
		},
		{
			name: 'Description',
			element: 'input',
			field: 'description',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese la descripción'
			},
			hint: 'Descripción'
		},
		{
			name: 'Sampling Interval',
			element: 'input',
			field: 'samplingInterval',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo de muestreo'
			},
			hint: 'Intervalo de muestreo'
		},
		{
			name: 'Base Dir Sim',
			element: 'input',
			field: 'baseDirSim',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio base de la simulación'
			},
			hint: 'Directorio base de la simulación'
		}
	],
	input: [
		{
			name: 'Directory',
			element: 'input',
			field: 'input.directory',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio'
			},
			hint: 'Directorio'
		},
		{
			name: 'Map',
			element: 'input',
			field: 'input.map',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el mapa'
			},
			hint: 'Mapa'
		},
		{
			name: 'Zones',
			element: 'input',
			field: 'input.zones',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese las zonas'
			},
			hint: 'Zonas'
		}
	],
	output: [
		{
			name: 'Progress Bar',
			element: 'select',
			field: 'output.progressBar',
			attributes: {
				placeholder: 'Seleccione la barra de progreso',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Barra de progreso'
		},
		{
			name: 'Interval',
			element: 'input',
			field: 'output.interval',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo'
			},
			hint: 'Intervalo'
		},
		{
			name: 'Directory',
			element: 'input',
			field: 'output.directory',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio'
			},
			hint: 'Directorio'
		},
		{
			name: 'Agents Out',
			element: 'select',
			field: 'output.agents-out',
			attributes: {
				placeholder: 'Seleccione la salida de agentes',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Salida de agentes'
		},
		{
			name: 'Agents Path',
			element: 'input',
			field: 'output.agents-path',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de agentes'
			},
			hint: 'Directorio de agentes'
		},
		{
			name: 'Agents Precision',
			element: 'input',
			field: 'output.agents-precision',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la precisión de agentes'
			},
			hint: 'Precisión de agentes'
		},
		{
			name: 'Agents Sufix',
			element: 'input',
			field: 'output.agents-sufix',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el sufijo de agentes'
			},
			hint: 'Sufijo de agentes'
		},
		{
			name: 'Stats Out',
			element: 'select',
			field: 'output.stats-out',
			attributes: {
				placeholder: 'Seleccione la salida de estadísticas',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Salida de estadísticas'
		},
		{
			name: 'Stats Interval',
			element: 'input',
			field: 'output.stats-interval',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo de estadísticas'
			},
			hint: 'Intervalo de estadísticas'
		},
		{
			name: 'Stats Path',
			element: 'input',
			field: 'output.stats-path',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de estadísticas'
			},
			hint: 'Directorio de estadísticas'
		},
		{
			name: 'Anim Config',
			element: 'input',
			field: 'output.anim-config',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese nombre de archivo de configuración de animación'
			},
			hint: 'Nombre de archivo de configuración de animación'
		},
		{
			name: 'Heat Map Out',
			element: 'select',
			field: 'output.heatMap-out',
			attributes: {
				placeholder: 'Seleccione la salida de mapa de calor',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Salida de mapa de calor'
		},
		{
			name: 'Heat Map Size',
			element: 'input',
			field: 'output.heatMap-size',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tamaño del mapa de calor'
			},
			hint: 'Tamaño del mapa de calor'
		},
		{
			name: 'Heat Map Interval',
			element: 'input',
			field: 'output.heatMap-interval',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo del mapa de calor'
			},
			hint: 'Intervalo del mapa de calor'
		},
		{
			name: 'Heat Map Path',
			element: 'input',
			field: 'output.heatMap-path',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio del mapa de calor'
			},
			hint: 'Directorio del mapa de calor'
		}
	],
	/* floodParams: {
		direction: string; //N->S;W->E
		sampleStateInterval: number;
		arrivalTime: number; //negative
		speedWaterProp: number; //float
		speedWaterLevel: number; //float
		criticalLevel: number; //float
		minSpeedFactor: number; //float
		imagesEnable: boolean;
		imagesDir: string;
		stateEnable: boolean;
		stateDir: string;
	}; */
	floodParams: [
		{
			name: 'Direction',
			element: 'input',
			field: 'floodParams.direction',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese la dirección'
			},
			hint: 'Dirección'
		},
		{
			name: 'Sample State Interval',
			element: 'input',
			field: 'floodParams.sampleStateInterval',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el intervalo de muestreo de estado'
			},
			hint: 'Intervalo de muestreo de estado'
		},
		{
			name: 'Arrival Time',
			element: 'input',
			field: 'floodParams.arrivalTime',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tiempo de llegada'
			},
			hint: 'Tiempo de llegada'
		},
		{
			name: 'Speed Water Prop',
			element: 'input',
			field: 'floodParams.speedWaterProp',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la velocidad del agua proporcional'
			},
			hint: 'Velocidad del agua proporcional'
		},
		{
			name: 'Speed Water Level',
			element: 'input',
			field: 'floodParams.speedWaterLevel',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la velocidad del agua nivel'
			},
			hint: 'Velocidad del agua nivel'
		},
		{
			name: 'Critical Level',
			element: 'input',
			field: 'floodParams.criticalLevel',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el nivel crítico'
			},
			hint: 'Nivel crítico'
		},
		{
			name: 'Min Speed Factor',
			element: 'input',
			field: 'floodParams.minSpeedFactor',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el factor de velocidad mínimo'
			},
			hint: 'Factor de velocidad mínimo'
		},
		{
			name: 'Images Enable',
			element: 'select',
			field: 'floodParams.imagesEnable',
			attributes: {
				placeholder: 'Seleccione la habilitación de imágenes',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Habilitación de imágenes'
		},
		{
			name: 'Images Dir',
			element: 'input',
			field: 'floodParams.imagesDir',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de imágenes'
			},
			hint: 'Directorio de imágenes'
		},
		{
			name: 'State Enable',
			element: 'select',
			field: 'floodParams.stateEnable',
			attributes: {
				placeholder: 'Seleccione la habilitación de estado',
				options: [
					{
						value: true,
						text: 'Habilitado'
					},
					{
						value: false,
						text: 'Deshabilitado'
					}
				]
			},
			hint: 'Habilitación de estado'
		},
		{
			name: 'State Dir',
			element: 'input',
			field: 'floodParams.stateDir',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de estado'
			},
			hint: 'Directorio de estado'
		}
	],
	densityParams: [
		{
			name: 'Min Density',
			element: 'input',
			field: 'densityParams.minDensity',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la densidad mínima'
			},
			hint: 'Densidad mínima'
		},
		{
			name: 'Max Density',
			element: 'input',
			field: 'densityParams.maxDensity',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la densidad máxima'
			},
			hint: 'Densidad máxima'
		},
		{
			name: 'Min Velocity',
			element: 'input',
			field: 'densityParams.minVelocity',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la velocidad mínima'
			},
			hint: 'Velocidad mínima'
		}
	],
	agents: [
		{
			name: 'Model',
			element: 'input',
			field: 'agents.model',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el modelo'
			},
			hint: 'Modelo'
		},
		{
			name: 'Number',
			element: 'input',
			field: 'agents.number',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el número'
			},
			hint: 'Número'
		},
		{
			name: 'Tau',
			element: 'input',
			field: 'agents.responseTime.tau',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tau'
			},
			hint: 'Tau'
		},
		{
			name: 'Sigma',
			element: 'input',
			field: 'agents.responseTime.sigma',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el sigma'
			},
			hint: 'Sigma'
		},
		{
			name: 'Mean Time Take Phone',
			element: 'input',
			field: 'agents.phoneUse.meanTimeTakePhone',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese el tiempo medio de toma de teléfono'
			},
			hint: 'Tiempo medio de toma de teléfono'
		},
		{
			name: 'Prob Phone Use Const',
			element: 'input',
			field: 'agents.phoneUse.probPhoneUseConst',
			attributes: {
				type: 'number',
				placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
			},
			hint: 'Probabilidad de uso de teléfono constante'
		}
	]
};
