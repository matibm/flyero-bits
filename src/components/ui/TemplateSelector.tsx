import { templates, templatesList } from '../../data/templates';
import { defaultTemplate } from '../../data/mockData';
import { useEditorStore } from '../../store/useEditorStore';
import type { TemplateLayout } from '../../types';

interface TemplateOption {
  id: string;
  name: string;
  preview_color: string;
  template: TemplateLayout;
}

const TemplateSelector: React.FC = () => {
  const activeTemplateId = useEditorStore((s) => s.activeTemplate.id);
  const setActiveTemplate = useEditorStore((s) => s.setActiveTemplate);

  const options: TemplateOption[] = [
    {
      id: defaultTemplate.id,
      name: 'Elegance',
      preview_color: '#1a1a2e',
      template: defaultTemplate,
    },
    ...templatesList.map((t, i) => ({
      id: t.id,
      name: t.name,
      preview_color: t.preview_color,
      template: templates[i],
    })),
  ];

  const handleSelect = (option: TemplateOption) => {
    if (option.id === activeTemplateId) return;
    setActiveTemplate(option.template);
  };

  return (
    <div className="w-full">
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        Plantillas
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
        {options.map((option) => {
          const isActive = option.id === activeTemplateId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div
                className={`w-[70px] h-[90px] rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'ring-2 ring-sky-500 ring-offset-2 ring-offset-gray-50 shadow-md'
                    : 'border border-gray-200 hover:border-sky-300 hover:shadow-sm'
                }`}
                style={{ backgroundColor: option.preview_color }}
              />
              <span
                className={`text-[11px] font-medium leading-tight text-center max-w-[70px] truncate ${
                  isActive ? 'text-sky-600' : 'text-gray-500'
                }`}
              >
                {option.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
