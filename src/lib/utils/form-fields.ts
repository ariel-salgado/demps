type TElement =
	| {
			name: string;
			element: 'input';
			field: string;
			hint?: string;
			error?: string;
	  }
	| {
			name: string;
			element: 'select';
			field: string;
			hint?: string;
			error?: string;
			options: Array<{
				value: string | number | boolean;
				text: string;
				selected?: boolean | undefined;
			}>;
	  };

export type TAttributes = {
	type?: 'text' | 'number';
	name: string;
	id?: string;
	placeholder?: string;
	value?: string;
	readonly?: boolean;
};

type TFormElement = TElement & { attributes: TAttributes };

type TConfiguration = Record<string, Array<TFormElement> | Record<string, Array<TFormElement>>>;

export const configurationFormFields: TConfiguration = {
	general: [
		{
			name: 'Duration',
			element: 'input',
			field: 'duration',
			hint: 'Duración de la simulación',
			attributes: {
				name: 'duration',
				type: 'number',
				placeholder: 'Ingrese la duración de la simulación'
			}
		},
		{
			name: 'Calibration',
			element: 'input',
			field: 'calibration',
			hint: 'Calibración de la simulación',
			attributes: {
				name: 'calibration',
				type: 'number',
				placeholder: 'Ingrese la calibración de la simulación'
			}
		},
		{
			name: 'Quad Size',
			element: 'input',
			field: 'quadSize',
			hint: 'Tamaño de los cuadrantes',
			attributes: {
				name: 'quadSize',
				type: 'number',
				placeholder: 'Ingrese el tamaño de los cuadrantes'
			}
		},
		{
			name: 'Close Enough',
			element: 'input',
			field: 'closeEnough',
			hint: 'Distancia de cercanía',
			attributes: {
				name: 'closeEnough',
				type: 'number',
				placeholder: 'Ingrese la distancia de cercanía'
			}
		},
		{
			name: 'Random Walkway Radius',
			element: 'input',
			field: 'randomWalkwayRadius',
			hint: 'Radio de la caminata aleatoria',
			attributes: {
				name: 'randomWalkwayRadius',
				type: 'number',
				placeholder: 'Ingrese el radio de la caminata aleatoria'
			}
		},
		{
			name: 'Attraction Radius',
			element: 'input',
			field: 'attractionRadius',
			hint: 'Radio de atracción',
			attributes: {
				name: 'attractionRadius',
				type: 'number',
				placeholder: 'Ingrese el radio de atracción'
			}
		},
		{
			name: 'Delta T',
			element: 'input',
			field: 'deltaT',
			hint: 'Delta T',
			attributes: {
				name: 'deltaT',
				type: 'number',
				placeholder: 'Ingrese el delta T'
			}
		},
		{
			name: 'Threads',
			element: 'input',
			field: 'threads',
			hint: 'Cantidad de hilos',
			attributes: {
				name: 'threads',
				type: 'number',
				placeholder: 'Ingrese la cantidad de hilos'
			}
		},
		{
			name: 'Flood Model Enable',
			element: 'select',
			field: 'floodModelEnable',
			hint: 'Modelo de inundación',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'floodModelEnable',
				placeholder: 'Seleccione el modelo de inundación'
			}
		},
		{
			name: 'Density Model Enable',
			element: 'select',
			field: 'densityModelEnable',
			hint: 'Modelo de densidad',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'densityModelEnable',
				placeholder: 'Seleccione el modelo de densidad'
			}
		},
		{
			name: 'Panic Model Enable',
			element: 'select',
			field: 'panicModelEnable',
			hint: 'Modelo de pánico',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'panicModelEnable',
				placeholder: 'Ingrese el modelo de pánico'
			}
		},
		{
			name: 'Elevation Model Enable',
			element: 'select',
			field: 'elevationModelEnable',
			hint: 'Modelo de elevación',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'elevationModelEnable',
				placeholder: 'Ingrese el modelo de elevación'
			}
		},
		{
			name: 'Debris Model Enable',
			element: 'select',
			field: 'debrisModelEnable',
			hint: 'Modelo de escombros',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'debrisModelEnable',
				placeholder: 'Ingrese el modelo de escombros'
			}
		},
		{
			name: 'City',
			element: 'input',
			field: 'city',
			hint: 'Ciudad',
			attributes: {
				type: 'text',
				name: 'city',
				placeholder: 'Ingrese la ciudad'
			}
		},
		{
			name: 'Description',
			element: 'input',
			field: 'description',
			hint: 'Descripción',
			attributes: {
				type: 'text',
				name: 'description',
				placeholder: 'Ingrese la descripción'
			}
		},
		{
			name: 'Sampling Interval',
			element: 'input',
			field: 'samplingInterval',
			hint: 'Intervalo de muestreo',
			attributes: {
				type: 'number',
				name: 'samplingInterval',
				placeholder: 'Ingrese el intervalo de muestreo'
			}
		},
		{
			name: 'Base Dir Sim',
			element: 'input',
			field: 'baseDirSim',
			hint: 'Directorio base de la simulación',
			attributes: {
				type: 'text',
				name: 'baseDirSim',
				placeholder: 'Ingrese el directorio base de la simulación'
			}
		}
	],
	input: [
		{
			name: 'Directory',
			element: 'input',
			field: 'input.directory',
			hint: 'Directorio',
			attributes: {
				type: 'text',
				name: 'input.directory',
				placeholder: 'Ingrese el directorio'
			}
		},
		{
			name: 'Map',
			element: 'input',
			field: 'input.map',
			hint: 'Mapa',
			attributes: {
				name: 'input.map',
				type: 'text',
				placeholder: 'Ingrese el mapa'
			}
		},
		{
			name: 'Zones',
			element: 'input',
			field: 'input.zones',
			hint: 'Zonas',
			attributes: {
				name: 'input.zones',
				type: 'text',
				placeholder: 'Ingrese las zonas'
			}
		}
	],
	output: [
		{
			name: 'Progress Bar',
			element: 'select',
			field: 'output.progressBar',
			hint: 'Barra de progreso',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.progressBar',
				placeholder: 'Seleccione la barra de progreso'
			}
		},
		{
			name: 'Interval',
			element: 'input',
			field: 'output.interval',
			hint: 'Intervalo',
			attributes: {
				type: 'number',
				name: 'output.interval',
				placeholder: 'Ingrese el intervalo'
			}
		},
		{
			name: 'Directory',
			element: 'input',
			field: 'output.directory',
			hint: 'Directorio',
			attributes: {
				type: 'text',
				name: 'output.directory',
				placeholder: 'Ingrese el directorio'
			}
		},
		{
			name: 'Agents Out',
			element: 'select',
			field: 'output.agents-out',
			hint: 'Salida de agentes',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.agents-out',
				placeholder: 'Seleccione la salida de agentes'
			}
		},
		{
			name: 'Agents Path',
			element: 'input',
			field: 'output.agents-path',
			hint: 'Directorio de agentes',
			attributes: {
				type: 'text',
				name: 'output.agents-path',
				placeholder: 'Ingrese el directorio de agentes'
			}
		},
		{
			name: 'Agents Precision',
			element: 'input',
			field: 'output.agents-precision',
			hint: 'Precisión de agentes',
			attributes: {
				type: 'number',
				name: 'output.agents-precision',
				placeholder: 'Ingrese la precisión de agentes'
			}
		},
		{
			name: 'Agents Sufix',
			element: 'input',
			field: 'output.agents-sufix',
			hint: 'Sufijo de agentes',
			attributes: {
				type: 'text',
				name: 'output.agents-sufix',
				placeholder: 'Ingrese el sufijo de agentes'
			}
		},
		{
			name: 'Stats Out',
			element: 'select',
			field: 'output.stats-out',
			hint: 'Salida de estadísticas',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.stats-out',
				placeholder: 'Seleccione la salida de estadísticas'
			}
		},
		{
			name: 'Stats Interval',
			element: 'input',
			field: 'output.stats-interval',
			hint: 'Intervalo de estadísticas',
			attributes: {
				type: 'number',
				name: 'output.stats-interval',
				placeholder: 'Ingrese el intervalo de estadísticas'
			}
		},
		{
			name: 'Stats Path',
			element: 'input',
			field: 'output.stats-path',
			hint: 'Directorio de estadísticas',
			attributes: {
				type: 'text',
				name: 'output.stats-path',
				placeholder: 'Ingrese el directorio de estadísticas'
			}
		},
		{
			name: 'Anim Config',
			element: 'input',
			field: 'output.anim-config',
			hint: 'Nombre de archivo de configuración de animación',
			attributes: {
				type: 'text',
				name: 'output.anim-config',
				placeholder: 'Ingrese nombre de archivo de configuración de animación'
			}
		},
		{
			name: 'Heat Map Out',
			element: 'select',
			field: 'output.heatMap-out',
			hint: 'Salida de mapa de calor',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'output.heatMap-out',
				placeholder: 'Seleccione la salida de mapa de calor'
			}
		},
		{
			name: 'Heat Map Size',
			element: 'input',
			field: 'output.heatMap-size',
			hint: 'Tamaño del mapa de calor',
			attributes: {
				type: 'number',
				name: 'output.heatMap-size',
				placeholder: 'Ingrese el tamaño del mapa de calor'
			}
		},
		{
			name: 'Heat Map Interval',
			element: 'input',
			field: 'output.heatMap-interval',
			hint: 'Intervalo del mapa de calor',
			attributes: {
				type: 'number',
				name: 'output.heatMap-interval',
				placeholder: 'Ingrese el intervalo del mapa de calor'
			}
		},
		{
			name: 'Heat Map Path',
			element: 'input',
			field: 'output.heatMap-path',
			hint: 'Directorio del mapa de calor',
			attributes: {
				type: 'text',
				name: 'output.heatMap-path',
				placeholder: 'Ingrese el directorio del mapa de calor'
			}
		}
	],
	floodParams: [
		{
			name: 'Direction',
			element: 'input',
			field: 'floodParams.direction',
			hint: 'Dirección',
			attributes: {
				type: 'text',
				name: 'floodParams.direction',
				placeholder: 'Ingrese la dirección'
			}
		},
		{
			name: 'Sample State Interval',
			element: 'input',
			field: 'floodParams.sampleStateInterval',
			hint: 'Intervalo de muestreo de estado',
			attributes: {
				type: 'number',
				name: 'floodParams.sampleStateInterval',
				placeholder: 'Ingrese el intervalo de muestreo de estado'
			}
		},
		{
			name: 'Arrival Time',
			element: 'input',
			field: 'floodParams.arrivalTime',
			hint: 'Tiempo de llegada',
			attributes: {
				type: 'number',
				name: 'floodParams.arrivalTime',
				placeholder: 'Ingrese el tiempo de llegada'
			}
		},
		{
			name: 'Speed Water Prop',
			element: 'input',
			field: 'floodParams.speedWaterProp',
			hint: 'Velocidad del agua proporcional',
			attributes: {
				type: 'number',
				name: 'floodParams.speedWaterProp',
				placeholder: 'Ingrese la velocidad del agua proporcional'
			}
		},
		{
			name: 'Speed Water Level',
			element: 'input',
			field: 'floodParams.speedWaterLevel',
			hint: 'Velocidad del agua nivel',
			attributes: {
				type: 'number',
				name: 'floodParams.speedWaterLevel',
				placeholder: 'Ingrese la velocidad del agua nivel'
			}
		},
		{
			name: 'Critical Level',
			element: 'input',
			field: 'floodParams.criticalLevel',
			hint: 'Nivel crítico',
			attributes: {
				type: 'number',
				name: 'floodParams.criticalLevel',
				placeholder: 'Ingrese el nivel crítico'
			}
		},
		{
			name: 'Min Speed Factor',
			element: 'input',
			field: 'floodParams.minSpeedFactor',
			hint: 'Factor de velocidad mínimo',
			attributes: {
				type: 'number',
				name: 'floodParams.minSpeedFactor',
				placeholder: 'Ingrese el factor de velocidad mínimo'
			}
		},
		{
			name: 'Images Enable',
			element: 'select',
			field: 'floodParams.imagesEnable',
			hint: 'Habilitación de imágenes',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'floodParams.imagesEnable',
				placeholder: 'Seleccione la habilitación de imágenes'
			}
		},
		{
			name: 'Images Dir',
			element: 'input',
			field: 'floodParams.imagesDir',
			hint: 'Directorio de imágenes',
			attributes: {
				type: 'text',
				name: 'floodParams.imagesDir',
				placeholder: 'Ingrese el directorio de imágenes'
			}
		},
		{
			name: 'State Enable',
			element: 'select',
			field: 'floodParams.stateEnable',
			hint: 'Habilitación de estado',
			options: [
				{
					value: true,
					text: 'Habilitado'
				},
				{
					value: false,
					text: 'Deshabilitado'
				}
			],
			attributes: {
				name: 'floodParams.stateEnable',
				placeholder: 'Seleccione la habilitación de estado'
			}
		},
		{
			name: 'State Dir',
			element: 'input',
			field: 'floodParams.stateDir',
			hint: 'Directorio de estado',
			attributes: {
				type: 'text',
				name: 'floodParams.stateDir',
				placeholder: 'Ingrese el directorio de estado'
			}
		}
	],
	densityParams: [
		{
			name: 'Min Density',
			element: 'input',
			field: 'densityParams.minDensity',
			hint: 'Densidad mínima',
			attributes: {
				type: 'number',
				name: 'densityParams.minDensity',
				placeholder: 'Ingrese la densidad mínima'
			}
		},
		{
			name: 'Max Density',
			element: 'input',
			field: 'densityParams.maxDensity',
			hint: 'Densidad máxima',
			attributes: {
				type: 'number',
				name: 'densityParams.maxDensity',
				placeholder: 'Ingrese la densidad máxima'
			}
		},
		{
			name: 'Min Velocity',
			element: 'input',
			field: 'densityParams.minVelocity',
			hint: 'Velocidad mínima',
			attributes: {
				type: 'number',
				name: 'densityParams.minVelocity',
				placeholder: 'Ingrese la velocidad mínima'
			}
		}
	],
	agents: {
		residents: [
			{
				name: 'Model',
				element: 'input',
				field: 'agents.0.model',
				hint: 'Modelo',
				attributes: {
					type: 'text',
					name: 'agents.0.model',
					placeholder: 'Ingrese el modelo',
					value: 'Residents',
					readonly: true
				}
			},
			{
				name: 'Number',
				element: 'input',
				field: 'agents.0.number',
				hint: 'Número',
				attributes: {
					type: 'number',
					name: 'agents.0.number',
					placeholder: 'Ingrese el número'
				}
			},
			{
				name: 'Tau',
				element: 'input',
				field: 'agents.0.responseTime.tau',
				hint: 'Tau',
				attributes: {
					type: 'number',
					name: 'agents.0.responseTime.tau',
					placeholder: 'Ingrese el tau'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.0.responseTime.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					name: 'agents.0.responseTime.sigma',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Mean Time Take Phone',
				element: 'input',
				field: 'agents.0.phoneUse.meanTimeTakePhone',
				hint: 'Tiempo medio de toma de teléfono',
				attributes: {
					type: 'number',
					name: 'agents.0.phoneUse.meanTimeTakePhone',
					placeholder: 'Ingrese el tiempo medio de toma de teléfono'
				}
			},
			{
				name: 'Prob Phone Use Const',
				element: 'input',
				field: 'agents.0.phoneUse.probPhoneUseConst',
				hint: 'Probabilidad de uso de teléfono constante',
				attributes: {
					type: 'number',
					name: 'agents.0.phoneUse.probPhoneUseConst',
					placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
				}
			},
			{
				name: 'G0 Prob',
				element: 'input',
				field: 'agents.0.ageRange.G0.prob',
				hint: 'Probabilidad G0',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G0.prob',
					placeholder: 'Ingrese la probabilidad G0'
				}
			},
			{
				name: 'G0 Min Speed',
				element: 'input',
				field: 'agents.0.ageRange.G0.minSpeed',
				hint: 'Velocidad mínima G0',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G0.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G0'
				}
			},
			{
				name: 'G0 Max Speed',
				element: 'input',
				field: 'agents.0.ageRange.G0.maxSpeed',
				hint: 'Velocidad máxima G0',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G0.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G0'
				}
			},
			{
				name: 'G1 Prob',
				element: 'input',
				field: 'agents.0.ageRange.G1.prob',
				hint: 'Probabilidad G1',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G1.prob',
					placeholder: 'Ingrese la probabilidad G1'
				}
			},
			{
				name: 'G1 Min Speed',
				element: 'input',
				field: 'agents.0.ageRange.G1.minSpeed',
				hint: 'Velocidad mínima G1',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G1.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G1'
				}
			},
			{
				name: 'G1 Max Speed',
				element: 'input',
				field: 'agents.0.ageRange.G1.maxSpeed',
				hint: 'Velocidad máxima G1',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G1.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G1'
				}
			},
			{
				name: 'G2 Prob',
				element: 'input',
				field: 'agents.0.ageRange.G2.prob',
				hint: 'Probabilidad G2',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G2.prob',
					placeholder: 'Ingrese la probabilidad G2'
				}
			},
			{
				name: 'G2 Min Speed',
				element: 'input',
				field: 'agents.0.ageRange.G2.minSpeed',
				hint: 'Velocidad mínima G2',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G2.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G2'
				}
			},
			{
				name: 'G2 Max Speed',
				element: 'input',
				field: 'agents.0.ageRange.G2.maxSpeed',
				hint: 'Velocidad máxima G2',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G2.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G2'
				}
			},
			{
				name: 'G3 Prob',
				element: 'input',
				field: 'agents.0.ageRange.G3.prob',
				hint: 'Probabilidad G3',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G3.prob',
					placeholder: 'Ingrese la probabilidad G3'
				}
			},
			{
				name: 'G3 Min Speed',
				element: 'input',
				field: 'agents.0.ageRange.G3.minSpeed',
				hint: 'Velocidad mínima G3',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G3.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G3'
				}
			},
			{
				name: 'G3 Max Speed',
				element: 'input',
				field: 'agents.0.ageRange.G3.maxSpeed',
				hint: 'Velocidad máxima G3',
				attributes: {
					type: 'number',
					name: 'agents.0.ageRange.G3.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G3'
				}
			},
			{
				name: 'Time Relax',
				element: 'input',
				field: 'agents.0.SFM.timeRelax',
				hint: 'Tiempo de relajación',
				attributes: {
					type: 'number',
					name: 'agents.0.SFM.timeRelax',
					placeholder: 'Ingrese el tiempo de relajación'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.0.SFM.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					name: 'agents.0.SFM.sigma',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Repulsive Force Agents',
				element: 'input',
				field: 'agents.0.SFM.repulsiveForceAgents',
				hint: 'Fuerza repulsiva de agentes',
				attributes: {
					type: 'number',
					name: 'agents.0.SFM.repulsiveForceAgents',
					placeholder: 'Ingrese la fuerza repulsiva de agentes'
				}
			},
			{
				name: 'Cos Phi',
				element: 'input',
				field: 'agents.0.SFM.cosphi',
				hint: 'Cos phi',
				attributes: {
					type: 'number',
					name: 'agents.0.SFM.cosphi',
					placeholder: 'Ingrese el cos phi'
				}
			},
			{
				name: 'Emotion Threshold',
				element: 'input',
				field: 'agents.0.panicModel.emotionThreshold',
				hint: 'Umbral de emoción',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.emotionThreshold',
					placeholder: 'Ingrese el umbral de emoción'
				}
			},
			{
				name: 'Prob Infected To Recovered',
				element: 'input',
				field: 'agents.0.panicModel.probInfectedToRecovered',
				hint: 'Probabilidad de infectado a recuperado',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.probInfectedToRecovered',
					placeholder: 'Ingrese la probabilidad de infectado a recuperado'
				}
			},
			{
				name: 'Prob Recovered To Susceptible',
				element: 'input',
				field: 'agents.0.panicModel.probRecoveredToSusceptible',
				hint: 'Probabilidad de recuperado a susceptible',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.probRecoveredToSusceptible',
					placeholder: 'Ingrese la probabilidad de recuperado a susceptible'
				}
			},
			{
				name: 'Mean Time In Infected',
				element: 'input',
				field: 'agents.0.panicModel.meanTimeInInfected',
				hint: 'Tiempo medio en infectado',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.meanTimeInInfected',
					placeholder: 'Ingrese el tiempo medio en infectado'
				}
			},
			{
				name: 'Sd Time In Infected',
				element: 'input',
				field: 'agents.0.panicModel.sdTimeInInfected',
				hint: 'Desviación estándar de tiempo en infectado',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.sdTimeInInfected',
					placeholder: 'Ingrese la desviación estándar de tiempo en infectado'
				}
			},
			{
				name: 'Mean Time In Recovered',
				element: 'input',
				field: 'agents.0.panicModel.meanTimeInRecovered',
				hint: 'Tiempo medio en recuperado',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.meanTimeInRecovered',
					placeholder: 'Ingrese el tiempo medio en recuperado'
				}
			},
			{
				name: 'Sd Time In Recovered',
				element: 'input',
				field: 'agents.0.panicModel.sdTimeInRecovered',
				hint: 'Desviación estándar de tiempo en recuperado',
				attributes: {
					type: 'number',
					name: 'agents.0.panicModel.sdTimeInRecovered',
					placeholder: 'Ingrese la desviación estándar de tiempo en recuperado'
				}
			}
		],
		visitors: [
			{
				name: 'Model',
				element: 'input',
				field: 'agents.1.model',
				hint: 'Modelo',
				attributes: {
					type: 'text',
					name: 'agents.1.model',
					placeholder: 'Ingrese el modelo',
					value: 'Visitors',
					readonly: true
				}
			},
			{
				name: 'Number',
				element: 'input',
				field: 'agents.1.number',
				hint: 'Número',
				attributes: {
					type: 'number',
					name: 'agents.1.number',
					placeholder: 'Ingrese el número'
				}
			},
			{
				name: 'Tau',
				element: 'input',
				field: 'agents.1.responseTime.tau',
				hint: 'Tau',
				attributes: {
					type: 'number',
					name: 'agents.1.responseTime.tau',
					placeholder: 'Ingrese el tau'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.1.responseTime.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					name: 'agents.1.responseTime.sigma',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Mean Time Take Phone',
				element: 'input',
				field: 'agents.1.phoneUse.meanTimeTakePhone',
				hint: 'Tiempo medio de toma de teléfono',
				attributes: {
					type: 'number',
					name: 'agents.1.phoneUse.meanTimeTakePhone',
					placeholder: 'Ingrese el tiempo medio de toma de teléfono'
				}
			},
			{
				name: 'Prob Phone Use Const',
				element: 'input',
				field: 'agents.1.phoneUse.probPhoneUseConst',
				hint: 'Probabilidad de uso de teléfono constante',
				attributes: {
					type: 'number',
					name: 'agents.1.phoneUse.probPhoneUseConst',
					placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
				}
			},
			{
				name: 'G0 Prob',
				element: 'input',
				field: 'agents.1.ageRange.G0.prob',
				hint: 'Probabilidad G0',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G0.prob',
					placeholder: 'Ingrese la probabilidad G0'
				}
			},
			{
				name: 'G0 Min Speed',
				element: 'input',
				field: 'agents.1.ageRange.G0.minSpeed',
				hint: 'Velocidad mínima G0',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G0.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G0'
				}
			},
			{
				name: 'G0 Max Speed',
				element: 'input',
				field: 'agents.1.ageRange.G0.maxSpeed',
				hint: 'Velocidad máxima G0',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G0.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G0'
				}
			},
			{
				name: 'G1 Prob',
				element: 'input',
				field: 'agents.1.ageRange.G1.prob',
				hint: 'Probabilidad G1',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G1.prob',
					placeholder: 'Ingrese la probabilidad G1'
				}
			},
			{
				name: 'G1 Min Speed',
				element: 'input',
				field: 'agents.1.ageRange.G1.minSpeed',
				hint: 'Velocidad mínima G1',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G1.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G1'
				}
			},
			{
				name: 'G1 Max Speed',
				element: 'input',
				field: 'agents.1.ageRange.G1.maxSpeed',
				hint: 'Velocidad máxima G1',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G1.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G1'
				}
			},
			{
				name: 'G2 Prob',
				element: 'input',
				field: 'agents.1.ageRange.G2.prob',
				hint: 'Probabilidad G2',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G2.prob',
					placeholder: 'Ingrese la probabilidad G2'
				}
			},
			{
				name: 'G2 Min Speed',
				element: 'input',
				field: 'agents.1.ageRange.G2.minSpeed',
				hint: 'Velocidad mínima G2',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G2.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G2'
				}
			},
			{
				name: 'G2 Max Speed',
				element: 'input',
				field: 'agents.1.ageRange.G2.maxSpeed',
				hint: 'Velocidad máxima G2',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G2.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G2'
				}
			},
			{
				name: 'G3 Prob',
				element: 'input',
				field: 'agents.1.ageRange.G3.prob',
				hint: 'Probabilidad G3',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G3.prob',
					placeholder: 'Ingrese la probabilidad G3'
				}
			},
			{
				name: 'G3 Min Speed',
				element: 'input',
				field: 'agents.1.ageRange.G3.minSpeed',
				hint: 'Velocidad mínima G3',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G3.minSpeed',
					placeholder: 'Ingrese la velocidad mínima G3'
				}
			},
			{
				name: 'G3 Max Speed',
				element: 'input',
				field: 'agents.1.ageRange.G3.maxSpeed',
				hint: 'Velocidad máxima G3',
				attributes: {
					type: 'number',
					name: 'agents.1.ageRange.G3.maxSpeed',
					placeholder: 'Ingrese la velocidad máxima G3'
				}
			},
			{
				name: 'Time Relax',
				element: 'input',
				field: 'agents.1.SFM.timeRelax',
				hint: 'Tiempo de relajación',
				attributes: {
					type: 'number',
					name: 'agents.1.SFM.timeRelax',
					placeholder: 'Ingrese el tiempo de relajación'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.1.SFM.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					name: 'agents.1.SFM.sigma',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Repulsive Force Agents',
				element: 'input',
				field: 'agents.1.SFM.repulsiveForceAgents',
				hint: 'Fuerza repulsiva de agentes',
				attributes: {
					type: 'number',
					name: 'agents.1.SFM.repulsiveForceAgents',
					placeholder: 'Ingrese la fuerza repulsiva de agentes'
				}
			},
			{
				name: 'Cos Phi',
				element: 'input',
				field: 'agents.1.SFM.cosphi',
				hint: 'Cos phi',
				attributes: {
					type: 'number',
					name: 'agents.1.SFM.cosphi',
					placeholder: 'Ingrese el cos phi'
				}
			},
			{
				name: 'Emotion Threshold',
				element: 'input',
				field: 'agents.1.panicModel.emotionThreshold',
				hint: 'Umbral de emoción',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.emotionThreshold',
					placeholder: 'Ingrese el umbral de emoción'
				}
			},
			{
				name: 'Prob Infected To Recovered',
				element: 'input',
				field: 'agents.1.panicModel.probInfectedToRecovered',
				hint: 'Probabilidad de infectado a recuperado',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.probInfectedToRecovered',
					placeholder: 'Ingrese la probabilidad de infectado a recuperado'
				}
			},
			{
				name: 'Prob Recovered To Susceptible',
				element: 'input',
				field: 'agents.1.panicModel.probRecoveredToSusceptible',
				hint: 'Probabilidad de recuperado a susceptible',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.probRecoveredToSusceptible',
					placeholder: 'Ingrese la probabilidad de recuperado a susceptible'
				}
			},
			{
				name: 'Mean Time In Infected',
				element: 'input',
				field: 'agents.1.panicModel.meanTimeInInfected',
				hint: 'Tiempo medio en infectado',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.meanTimeInInfected',
					placeholder: 'Ingrese el tiempo medio en infectado'
				}
			},
			{
				name: 'Sd Time In Infected',
				element: 'input',
				field: 'agents.1.panicModel.sdTimeInInfected',
				hint: 'Desviación estándar de tiempo en infectado',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.sdTimeInInfected',
					placeholder: 'Ingrese la desviación estándar de tiempo en infectado'
				}
			},
			{
				name: 'Mean Time In Recovered',
				element: 'input',
				field: 'agents.1.panicModel.meanTimeInRecovered',
				hint: 'Tiempo medio en recuperado',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.meanTimeInRecovered',
					placeholder: 'Ingrese el tiempo medio en recuperado'
				}
			},
			{
				name: 'Sd Time In Recovered',
				element: 'input',
				field: 'agents.1.panicModel.sdTimeInRecovered',
				hint: 'Desviación estándar de tiempo en recuperado',
				attributes: {
					type: 'number',
					name: 'agents.1.panicModel.sdTimeInRecovered',
					placeholder: 'Ingrese la desviación estándar de tiempo en recuperado'
				}
			}
		]
	}
};
