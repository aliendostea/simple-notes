export default function IconEmptyNotes() {
  return (
    <svg
      fill="#262626"
      height="100px"
      width="100px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      enableBackground="new 0 0 50 50"
    >
      <path
        d="M36,40.301c0.552,0,1-0.447,1-1v-24.6c0-0.022-0.011-0.041-0.013-0.063c-0.006-0.09-0.023-0.177-0.053-0.262
	c-0.012-0.034-0.021-0.066-0.036-0.098c-0.045-0.096-0.103-0.186-0.179-0.265c-0.006-0.006-0.009-0.015-0.016-0.021
	c-0.001-0.001-0.002-0.003-0.003-0.005l-5.5-5.4c-0.083-0.081-0.18-0.14-0.282-0.188c-0.031-0.014-0.063-0.022-0.096-0.033
	c-0.085-0.029-0.172-0.047-0.262-0.053C30.54,8.312,30.522,8.301,30.5,8.301H14c-0.552,0-1,0.447-1,1v30c0,0.553,0.448,1,1,1H36z
	 M31.5,11.685l2.054,2.017H31.5V11.685z M15,10.301h14.5v4.4c0,0.553,0.448,1,1,1H35v22.6H15V10.301z"
      />
    </svg>
  );
}

export function IconNotesPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
      <path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280l160-160v-280H360Zm220 220Zm-40 160h80v-120h120v-80H620v-120h-80v120H420v80h120v120Z" />
    </svg>
  );
}

export function IconSimpleNotes({
  height = 34,
  width = 34,
  fill = "#70b8ff",
}: {
  height?: number;
  width?: number;
  fill?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={fill}>
      <path d="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280v-160h160v-280H360Zm220 220Z" />
    </svg>
  );
}

export function IconChecklist({
  height = 34,
  width = 34,
  fill = "#e3e3e3",
}: {
  height?: number;
  width?: number;
  fill?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={fill}>
      <path d="m508-398 226-226-56-58-170 170-86-84-56 56 142 142ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z" />
    </svg>
  );
}

export function IconX({
  height = 20,
  width = 20,
  fill = "#e3e3e396",
}: {
  height?: number;
  width?: number;
  fill?: string;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={fill}>
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}
