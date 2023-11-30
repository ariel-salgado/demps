export type DeepNullable<T> = {
	[K in keyof T]: DeepNullable<T[K]> | null;
};

export type FormInput =
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

export type InputAttribute = {
	type?: 'text' | 'number';
	name: string;
	id?: string;
	placeholder?: string;
	value?: string;
	readonly?: boolean;
};

export type InputFormField = FormInput & { attributes: InputAttribute };

export type ConfigurationFormField = Record<
	string,
	Array<InputFormField> | Record<string, Array<InputFormField>>
>;

export type Configuration = {
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
