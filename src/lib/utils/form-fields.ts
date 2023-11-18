type TElement =
	| {
			name: string;
			element: 'input';
			field: string;
			hint?: string;
			error?: string;
			attributes: {
				type: 'text' | 'number';
				placeholder?: string;
				value?: string;
			};
	  }
	| {
			name: string;
			element: 'select';
			field: string;
			hint?: string;
			error?: string;
			attributes: {
				placeholder?: string;
				value?: string;
				options: Array<{
					value: string | number | boolean;
					text: string;
				}>;
			};
	  };

type TConfiguration = Record<string, Array<TElement> | Record<string, Array<TElement>>>;

export const configurationFormFields: TConfiguration = {
	general: [
		{
			name: 'Duration',
			element: 'input',
			field: 'duration',
			hint: 'Duración de la simulación',
			attributes: {
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
				type: 'number',
				placeholder: 'Ingrese la cantidad de hilos'
			}
		},
		{
			name: 'Flood Model Enable',
			element: 'select',
			field: 'floodModelEnable',
			hint: 'Modelo de inundación',
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
			}
		},
		{
			name: 'Density Model Enable',
			element: 'select',
			field: 'densityModelEnable',
			hint: 'Modelo de densidad',
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
			}
		},
		{
			name: 'Panic Model Enable',
			element: 'select',
			field: 'panicModelEnable',
			hint: 'Modelo de pánico',
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
			}
		},
		{
			name: 'Elevation Model Enable',
			element: 'select',
			field: 'elevationModelEnable',
			hint: 'Modelo de elevación',
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
			}
		},
		{
			name: 'Debris Model Enable',
			element: 'select',
			field: 'debrisModelEnable',
			hint: 'Modelo de escombros',
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
			}
		},
		{
			name: 'City',
			element: 'input',
			field: 'city',
			hint: 'Ciudad',
			attributes: {
				type: 'text',
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
				placeholder: 'Ingrese el directorio'
			}
		},
		{
			name: 'Map',
			element: 'input',
			field: 'input.map',
			hint: 'Mapa',
			attributes: {
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
			}
		},
		{
			name: 'Interval',
			element: 'input',
			field: 'output.interval',
			hint: 'Intervalo',
			attributes: {
				type: 'number',
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
				placeholder: 'Ingrese el directorio'
			}
		},
		{
			name: 'Agents Out',
			element: 'select',
			field: 'output.agents-out',
			hint: 'Salida de agentes',
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
			}
		},
		{
			name: 'Agents Path',
			element: 'input',
			field: 'output.agents-path',
			hint: 'Directorio de agentes',
			attributes: {
				type: 'text',
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
				placeholder: 'Ingrese el sufijo de agentes'
			}
		},
		{
			name: 'Stats Out',
			element: 'select',
			field: 'output.stats-out',
			hint: 'Salida de estadísticas',
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
			}
		},
		{
			name: 'Stats Interval',
			element: 'input',
			field: 'output.stats-interval',
			hint: 'Intervalo de estadísticas',
			attributes: {
				type: 'number',
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
				placeholder: 'Ingrese nombre de archivo de configuración de animación'
			}
		},
		{
			name: 'Heat Map Out',
			element: 'select',
			field: 'output.heatMap-out',
			hint: 'Salida de mapa de calor',
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
			}
		},
		{
			name: 'Heat Map Size',
			element: 'input',
			field: 'output.heatMap-size',
			hint: 'Tamaño del mapa de calor',
			attributes: {
				type: 'number',
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
				placeholder: 'Ingrese el factor de velocidad mínimo'
			}
		},
		{
			name: 'Images Enable',
			element: 'select',
			field: 'floodParams.imagesEnable',
			hint: 'Habilitación de imágenes',
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
			}
		},
		{
			name: 'Images Dir',
			element: 'input',
			field: 'floodParams.imagesDir',
			hint: 'Directorio de imágenes',
			attributes: {
				type: 'text',
				placeholder: 'Ingrese el directorio de imágenes'
			}
		},
		{
			name: 'State Enable',
			element: 'select',
			field: 'floodParams.stateEnable',
			hint: 'Habilitación de estado',
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
			}
		},
		{
			name: 'State Dir',
			element: 'input',
			field: 'floodParams.stateDir',
			hint: 'Directorio de estado',
			attributes: {
				type: 'text',
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
				placeholder: 'Ingrese la velocidad mínima'
			}
		}
	],
	agents: {
		residents: [
			{
				name: 'Residents',
				element: 'input',
				field: 'agents.model',
				hint: 'Modelo',
				attributes: {
					type: 'text',
					placeholder: 'Ingrese el modelo'
				}
			},
			{
				name: 'Number',
				element: 'input',
				field: 'agents.number',
				hint: 'Número',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el número'
				}
			},
			{
				name: 'Tau',
				element: 'input',
				field: 'agents.responseTime.tau',
				hint: 'Tau',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tau'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.responseTime.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Mean Time Take Phone',
				element: 'input',
				field: 'agents.phoneUse.meanTimeTakePhone',
				hint: 'Tiempo medio de toma de teléfono',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo medio de toma de teléfono'
				}
			},
			{
				name: 'Prob Phone Use Const',
				element: 'input',
				field: 'agents.phoneUse.probPhoneUseConst',
				hint: 'Probabilidad de uso de teléfono constante',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
				}
			},
			{
				name: 'G0 Prob',
				element: 'input',
				field: 'agents.ageRange.G0.prob',
				hint: 'Probabilidad G0',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G0'
				}
			},
			{
				name: 'G0 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G0.minSpeed',
				hint: 'Velocidad mínima G0',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G0'
				}
			},
			{
				name: 'G0 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G0.maxSpeed',
				hint: 'Velocidad máxima G0',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G0'
				}
			},
			{
				name: 'G1 Prob',
				element: 'input',
				field: 'agents.ageRange.G1.prob',
				hint: 'Probabilidad G1',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G1'
				}
			},
			{
				name: 'G1 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G1.minSpeed',
				hint: 'Velocidad mínima G1',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G1'
				}
			},
			{
				name: 'G1 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G1.maxSpeed',
				hint: 'Velocidad máxima G1',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G1'
				}
			},
			{
				name: 'G2 Prob',
				element: 'input',
				field: 'agents.ageRange.G2.prob',
				hint: 'Probabilidad G2',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G2'
				}
			},
			{
				name: 'G2 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G2.minSpeed',
				hint: 'Velocidad mínima G2',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G2'
				}
			},
			{
				name: 'G2 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G2.maxSpeed',
				hint: 'Velocidad máxima G2',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G2'
				}
			},
			{
				name: 'G3 Prob',
				element: 'input',
				field: 'agents.ageRange.G3.prob',
				hint: 'Probabilidad G3',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G3'
				}
			},
			{
				name: 'G3 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G3.minSpeed',
				hint: 'Velocidad mínima G3',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G3'
				}
			},
			{
				name: 'G3 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G3.maxSpeed',
				hint: 'Velocidad máxima G3',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G3'
				}
			},
			{
				name: 'Time Relax',
				element: 'input',
				field: 'agents.SFM.timeRelax',
				hint: 'Tiempo de relajación',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo de relajación'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.SFM.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Repulsive Force Agents',
				element: 'input',
				field: 'agents.SFM.repulsiveForceAgents',
				hint: 'Fuerza repulsiva de agentes',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la fuerza repulsiva de agentes'
				}
			},
			{
				name: 'Cos Phi',
				element: 'input',
				field: 'agents.SFM.cosphi',
				hint: 'Cos phi',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el cos phi'
				}
			},
			{
				name: 'Emotion Threshold',
				element: 'input',
				field: 'agents.panicModel.emotionThreshold',
				hint: 'Umbral de emoción',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el umbral de emoción'
				}
			},
			{
				name: 'Prob Infected To Recovered',
				element: 'input',
				field: 'agents.panicModel.probInfectedToRecovered',
				hint: 'Probabilidad de infectado a recuperado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad de infectado a recuperado'
				}
			},
			{
				name: 'Prob Recovered To Susceptible',
				element: 'input',
				field: 'agents.panicModel.probRecoveredToSusceptible',
				hint: 'Probabilidad de recuperado a susceptible',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad de recuperado a susceptible'
				}
			},
			{
				name: 'Mean Time In Infected',
				element: 'input',
				field: 'agents.panicModel.meanTimeInInfected',
				hint: 'Tiempo medio en infectado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en infectado'
				}
			},
			{
				name: 'Sd Time In Infected',
				element: 'input',
				field: 'agents.panicModel.sdTimeInInfected',
				hint: 'Desviación estándar de tiempo en infectado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en infectado'
				}
			},
			{
				name: 'Mean Time In Recovered',
				element: 'input',
				field: 'agents.panicModel.meanTimeInRecovered',
				hint: 'Tiempo medio en recuperado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en recuperado'
				}
			},
			{
				name: 'Sd Time In Recovered',
				element: 'input',
				field: 'agents.panicModel.sdTimeInRecovered',
				hint: 'Desviación estándar de tiempo en recuperado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en recuperado'
				}
			}
		],
		visitors: [
			{
				name: 'Visitors',
				element: 'input',
				field: 'agents.model',
				hint: 'Modelo',
				attributes: {
					type: 'text',
					placeholder: 'Ingrese el modelo'
				}
			},
			{
				name: 'Number',
				element: 'input',
				field: 'agents.number',
				hint: 'Número',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el número'
				}
			},
			{
				name: 'Tau',
				element: 'input',
				field: 'agents.responseTime.tau',
				hint: 'Tau',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tau'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.responseTime.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Mean Time Take Phone',
				element: 'input',
				field: 'agents.phoneUse.meanTimeTakePhone',
				hint: 'Tiempo medio de toma de teléfono',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo medio de toma de teléfono'
				}
			},
			{
				name: 'Prob Phone Use Const',
				element: 'input',
				field: 'agents.phoneUse.probPhoneUseConst',
				hint: 'Probabilidad de uso de teléfono constante',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad de uso de teléfono constante'
				}
			},
			{
				name: 'G0 Prob',
				element: 'input',
				field: 'agents.ageRange.G0.prob',
				hint: 'Probabilidad G0',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G0'
				}
			},
			{
				name: 'G0 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G0.minSpeed',
				hint: 'Velocidad mínima G0',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G0'
				}
			},
			{
				name: 'G0 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G0.maxSpeed',
				hint: 'Velocidad máxima G0',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G0'
				}
			},
			{
				name: 'G1 Prob',
				element: 'input',
				field: 'agents.ageRange.G1.prob',
				hint: 'Probabilidad G1',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G1'
				}
			},
			{
				name: 'G1 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G1.minSpeed',
				hint: 'Velocidad mínima G1',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G1'
				}
			},
			{
				name: 'G1 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G1.maxSpeed',
				hint: 'Velocidad máxima G1',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G1'
				}
			},
			{
				name: 'G2 Prob',
				element: 'input',
				field: 'agents.ageRange.G2.prob',
				hint: 'Probabilidad G2',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G2'
				}
			},
			{
				name: 'G2 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G2.minSpeed',
				hint: 'Velocidad mínima G2',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G2'
				}
			},
			{
				name: 'G2 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G2.maxSpeed',
				hint: 'Velocidad máxima G2',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G2'
				}
			},
			{
				name: 'G3 Prob',
				element: 'input',
				field: 'agents.ageRange.G3.prob',
				hint: 'Probabilidad G3',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad G3'
				}
			},
			{
				name: 'G3 Min Speed',
				element: 'input',
				field: 'agents.ageRange.G3.minSpeed',
				hint: 'Velocidad mínima G3',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad mínima G3'
				}
			},
			{
				name: 'G3 Max Speed',
				element: 'input',
				field: 'agents.ageRange.G3.maxSpeed',
				hint: 'Velocidad máxima G3',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la velocidad máxima G3'
				}
			},
			{
				name: 'Time Relax',
				element: 'input',
				field: 'agents.SFM.timeRelax',
				hint: 'Tiempo de relajación',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo de relajación'
				}
			},
			{
				name: 'Sigma',
				element: 'input',
				field: 'agents.SFM.sigma',
				hint: 'Sigma',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el sigma'
				}
			},
			{
				name: 'Repulsive Force Agents',
				element: 'input',
				field: 'agents.SFM.repulsiveForceAgents',
				hint: 'Fuerza repulsiva de agentes',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la fuerza repulsiva de agentes'
				}
			},
			{
				name: 'Cos Phi',
				element: 'input',
				field: 'agents.SFM.cosphi',
				hint: 'Cos phi',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el cos phi'
				}
			},
			{
				name: 'Emotion Threshold',
				element: 'input',
				field: 'agents.panicModel.emotionThreshold',
				hint: 'Umbral de emoción',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el umbral de emoción'
				}
			},
			{
				name: 'Prob Infected To Recovered',
				element: 'input',
				field: 'agents.panicModel.probInfectedToRecovered',
				hint: 'Probabilidad de infectado a recuperado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad de infectado a recuperado'
				}
			},
			{
				name: 'Prob Recovered To Susceptible',
				element: 'input',
				field: 'agents.panicModel.probRecoveredToSusceptible',
				hint: 'Probabilidad de recuperado a susceptible',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la probabilidad de recuperado a susceptible'
				}
			},
			{
				name: 'Mean Time In Infected',
				element: 'input',
				field: 'agents.panicModel.meanTimeInInfected',
				hint: 'Tiempo medio en infectado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en infectado'
				}
			},
			{
				name: 'Sd Time In Infected',
				element: 'input',
				field: 'agents.panicModel.sdTimeInInfected',
				hint: 'Desviación estándar de tiempo en infectado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en infectado'
				}
			},
			{
				name: 'Mean Time In Recovered',
				element: 'input',
				field: 'agents.panicModel.meanTimeInRecovered',
				hint: 'Tiempo medio en recuperado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese el tiempo medio en recuperado'
				}
			},
			{
				name: 'Sd Time In Recovered',
				element: 'input',
				field: 'agents.panicModel.sdTimeInRecovered',
				hint: 'Desviación estándar de tiempo en recuperado',
				attributes: {
					type: 'number',
					placeholder: 'Ingrese la desviación estándar de tiempo en recuperado'
				}
			}
		]
	}
};
