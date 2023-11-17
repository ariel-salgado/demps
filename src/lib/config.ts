export type DeepNullable<T> = {
	[K in keyof T]: DeepNullable<T[K]> | null;
};

export type TConfiguration = {
	duration: number;
	calibration: number;
	quadSize: number;
	closeEnough: number; //float
	randomWalkwayRadius: number; //float
	attractionRadius: number; //float
	deltaT: number; //float
	threads: number;
	floodModelEnable: boolean;
	densityModelEnable: boolean;
	panicModelEnable: boolean;
	elevationModelEnable: boolean;
	debrisModelEnable: boolean;
	city: string;
	description: string;
	samplingInterval: number;
	baseDirSim: string;
	input: {
		directory: string;
		map: string;
		zones: string;
	};
	output: {
		progressBar: boolean;
		interval: number;
		directory: string;
		'agents-out': boolean;
		'agents-path': string;
		'agents-precision': number;
		'agents-sufix': string;
		'stats-out': boolean;
		'stats-interval': number;
		'stats-path': string;
		'anim-config': string;
		'heatMap-out': boolean;
		'heatMap-size': number;
		'heatMap-interval': number;
		'heatMap-path': string;
	};
	floodParams: {
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
	};
	densityParams: {
		minDensity: number; //float
		maxDensity: number; //float
		minVelocity: number; //float
	};
	agents: [
		{
			model: 'Residents';
			number: number;
			responseTime: {
				tau: number;
				sigma: number;
			};
			phoneUse: {
				meanTimeTakePhone: number; //float
				probPhoneUseConst: number;
			};
			ageRange: {
				G0: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
				G1: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
				G2: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
				G3: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
			};
			SFM: {
				timeRelax: number; //float
				sigma: number; //float
				repulsiveForceAgents: number; //float
				cosphi: number; //negative float
			};
			panicModel: {
				emotionThreshold: number; //float
				probInfectedToRecovered: number; //float
				probRecoveredToSusceptible: number; //float
				meanTimeInInfected: number;
				sdTimeInInfected: number; //float
				meanTimeInRecovered: number;
				sdTimeInRecovered: number; //float
			};
		},
		{
			model: 'Visitors';
			number: number;
			responseTime: {
				tau: number;
				sigma: number;
			};
			phoneUse: {
				meanTimeTakePhone: number; //float
				probPhoneUseConst: number;
			};
			ageRange: {
				G0: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
				G1: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
				G2: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
				G3: {
					prob: number; //float
					minSpeed: number; //float
					maxSpeed: number; //float
				};
			};
			SFM: {
				timeRelax: number; //float
				sigma: number; //float
				repulsiveForceAgents: number; //float
				cosphi: number; //negative float
			};
			panicModel: {
				emotionThreshold: number; //float
				probInfectedToRecovered: number; //float
				probRecoveredToSusceptible: number; //float
				meanTimeInInfected: number;
				sdTimeInInfected: number; //float
				meanTimeInRecovered: number;
				sdTimeInRecovered: number; //float
			};
		}
	];
};

export const getConfiguration = (): DeepNullable<TConfiguration> => {
	const obj: DeepNullable<TConfiguration> = {
		duration: null,
		calibration: null,
		quadSize: null,
		closeEnough: null,
		randomWalkwayRadius: null,
		attractionRadius: null,
		deltaT: null,
		threads: null,
		floodModelEnable: null,
		densityModelEnable: null,
		panicModelEnable: null,
		elevationModelEnable: null,
		debrisModelEnable: null,
		city: null,
		description: null,
		samplingInterval: null,
		baseDirSim: null,
		input: {
			directory: null,
			map: null,
			zones: null
		},
		output: {
			progressBar: null,
			interval: null,
			directory: null,
			'agents-out': null,
			'agents-path': null,
			'agents-precision': null,
			'agents-sufix': null,
			'stats-out': null,
			'stats-interval': null,
			'stats-path': null,
			'anim-config': null,
			'heatMap-out': null,
			'heatMap-size': null,
			'heatMap-interval': null,
			'heatMap-path': null
		},
		floodParams: {
			direction: null,
			sampleStateInterval: null,
			arrivalTime: null,
			speedWaterProp: null,
			speedWaterLevel: null,
			criticalLevel: null,
			minSpeedFactor: null,
			imagesEnable: null,
			imagesDir: null,
			stateEnable: null,
			stateDir: null
		},
		densityParams: {
			minDensity: null,
			maxDensity: null,
			minVelocity: null
		},
		agents: [
			{
				model: 'Residents',
				number: null,
				responseTime: {
					tau: null,
					sigma: null
				},
				phoneUse: {
					meanTimeTakePhone: null,
					probPhoneUseConst: null
				},
				ageRange: {
					G0: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					},
					G1: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					},
					G2: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					},
					G3: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					}
				},
				SFM: {
					timeRelax: null,
					sigma: null,
					repulsiveForceAgents: null,
					cosphi: null
				},
				panicModel: {
					emotionThreshold: null,
					probInfectedToRecovered: null,
					probRecoveredToSusceptible: null,
					meanTimeInInfected: null,
					sdTimeInInfected: null,
					meanTimeInRecovered: null,
					sdTimeInRecovered: null
				}
			},
			{
				model: 'Visitors',
				number: null,
				responseTime: {
					tau: null,
					sigma: null
				},
				phoneUse: {
					meanTimeTakePhone: null,
					probPhoneUseConst: null
				},
				ageRange: {
					G0: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					},
					G1: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					},
					G2: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					},
					G3: {
						prob: null,
						minSpeed: null,
						maxSpeed: null
					}
				},
				SFM: {
					timeRelax: null,
					sigma: null,
					repulsiveForceAgents: null,
					cosphi: null
				},
				panicModel: {
					emotionThreshold: null,
					probInfectedToRecovered: null,
					probRecoveredToSusceptible: null,
					meanTimeInInfected: null,
					sdTimeInInfected: null,
					meanTimeInRecovered: null,
					sdTimeInRecovered: null
				}
			}
		]
	};

	return obj;
};
