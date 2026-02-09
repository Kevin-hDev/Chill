interface StatusLabels {
  ok: string;
  bug: string;
  testing: string;
}

interface Props {
  statusLabels: StatusLabels;
}

type Status = 'ok' | 'bug' | 'testing';

interface AgentCompat {
  name: string;
  win: Status;
  linux: Status;
  ios: Status;
}

const agents: AgentCompat[] = [
  { name: 'Claude Code', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'Codex CLI', win: 'ok', linux: 'bug', ios: 'testing' },
  { name: 'Cursor CLI', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'Kimi Code', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'Gemini CLI', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'Droid CLI', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'Mistral Vibe', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'Crush', win: 'testing', linux: 'testing', ios: 'testing' },
  { name: 'Grok CLI', win: 'ok', linux: 'ok', ios: 'testing' },
  { name: 'OpenCode', win: 'bug', linux: 'bug', ios: 'testing' },
];

function StatusDot({ status, label }: { status: Status; label: string }) {
  const colors: Record<Status, string> = {
    ok: 'bg-green-500',
    bug: 'bg-red-500',
    testing: 'bg-orange-400',
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`block w-2.5 h-2.5 rounded-full ${colors[status]}`} />
      <span className="text-micro text-chill-text-secondary">{label}</span>
    </span>
  );
}

export default function CompatTable({ statusLabels }: Props) {
  function getLabel(status: Status): string {
    return statusLabels[status];
  }

  return (
    <div className="overflow-x-auto rounded-chill border border-chill-border bg-chill-elevated">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-chill-border">
            <th className="px-4 py-3 text-body-sm font-heading font-semibold text-chill-text">
              Agent
            </th>
            <th className="px-4 py-3 text-body-sm font-heading font-semibold text-chill-text text-center">
              Windows
            </th>
            <th className="px-4 py-3 text-body-sm font-heading font-semibold text-chill-text text-center">
              Linux
            </th>
            <th className="px-4 py-3 text-body-sm font-heading font-semibold text-chill-text text-center">
              iOS
            </th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, i) => (
            <tr
              key={agent.name}
              className={`border-b border-chill-border last:border-b-0 ${
                i % 2 === 0 ? 'bg-chill-elevated' : 'bg-chill-surface'
              }`}
            >
              <td className="px-4 py-3 text-body-sm font-mono text-chill-text">
                {agent.name}
              </td>
              <td className="px-4 py-3 text-center">
                <StatusDot status={agent.win} label={getLabel(agent.win)} />
              </td>
              <td className="px-4 py-3 text-center">
                <StatusDot status={agent.linux} label={getLabel(agent.linux)} />
              </td>
              <td className="px-4 py-3 text-center">
                <StatusDot status={agent.ios} label={getLabel(agent.ios)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
