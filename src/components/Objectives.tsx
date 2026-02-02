import { clsx } from 'clsx'

export interface Objective {
  id: string
  label: string
  completed: boolean
  failed: boolean
  showMoves: boolean
}

interface ObjectivesProps {
  objectives: Objective[]
  currentMoves?: number
  maxMoves?: number
}

export function Objectives({ objectives, currentMoves, maxMoves }: ObjectivesProps) {
  return (
    <div className="flex flex-col">
      {objectives.map(obj => (
        <div
          key={obj.id}
          className={clsx(
            'flex items-center gap-0 text-sm font-medium transition-all duration-300',
            obj.completed && 'opacity-50',
          )}
        >
          <span
            className={clsx(
              'text-sm w-5',
              obj.completed ? 'text-green-400' : obj.failed ? 'text-red-500' : 'animate-pulse',
            )}
          >
            {obj.completed ? '◉' : obj.failed ? '◉' : '◎'}
          </span>
          <span className={clsx(obj.completed && ' text-green-400', obj.failed && 'text-red-400')}>
            {obj.label}
          </span>
          {obj.showMoves && currentMoves !== undefined && maxMoves !== undefined && (
            <span
              className={clsx(
                'ml-auto text-sm font-bold opacity-80',
                obj.failed ? 'text-red-400' : 'text-[#ffb142]',
              )}
            >
              ({currentMoves}/{maxMoves})
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
