import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Snowflake {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  drift: number;
  opacity: number;
}

interface RunningButton {
  id: number;
  x: number;
  y: number;
  isRunning: boolean;
  strategy: "random" | "opposite" | "spiral" | "bounce";
}

const Index = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [runningButtons, setRunningButtons] = useState<RunningButton[]>([]);
  const animationRef = useRef<number>();

  // Улучшенная генерация снежинок с физикой
  useEffect(() => {
    const generateSnowflakes = () => {
      const newSnowflakes: Snowflake[] = [];
      for (let i = 0; i < 80; i++) {
        newSnowflakes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * -100,
          speed: Math.random() * 2 + 0.5,
          size: Math.random() * 0.7 + 0.3,
          drift: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.8 + 0.2,
        });
      }
      setSnowflakes(newSnowflakes);
    };
    generateSnowflakes();
  }, []);

  // Анимация снежинок
  useEffect(() => {
    const animate = () => {
      setSnowflakes((prev) =>
        prev.map((snowflake) => {
          let newY = snowflake.y + snowflake.speed;
          let newX = snowflake.x + snowflake.drift;

          // Сброс позиции при достижении низа
          if (newY > 110) {
            newY = -10;
            newX = Math.random() * 100;
          }

          // Ограничение по горизонтали
          if (newX < -5) newX = 105;
          if (newX > 105) newX = -5;

          return {
            ...snowflake,
            x: newX,
            y: newY,
          };
        }),
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Инициализация умных убегающих кнопок
  useEffect(() => {
    const initialButtons: RunningButton[] = [
      { id: 1, x: 20, y: 30, isRunning: false, strategy: "random" },
      { id: 2, x: 80, y: 30, isRunning: false, strategy: "opposite" },
      { id: 3, x: 50, y: 60, isRunning: false, strategy: "spiral" },
      { id: 4, x: 30, y: 80, isRunning: false, strategy: "bounce" },
      { id: 5, x: 70, y: 80, isRunning: false, strategy: "random" },
    ];
    setRunningButtons(initialButtons);
  }, []);

  const handleButtonHover = (
    buttonId: number,
    mouseX: number,
    mouseY: number,
  ) => {
    setRunningButtons((prev) =>
      prev.map((btn) => {
        if (btn.id === buttonId) {
          let newX = btn.x;
          let newY = btn.y;

          switch (btn.strategy) {
            case "random":
              newX = Math.random() * 80 + 10;
              newY = Math.random() * 70 + 15;
              break;
            case "opposite":
              // Убегает в противоположную сторону от мыши
              const deltaX = btn.x - mouseX;
              const deltaY = btn.y - mouseY;
              newX = Math.max(5, Math.min(95, btn.x + deltaX * 0.8));
              newY = Math.max(15, Math.min(85, btn.y + deltaY * 0.8));
              break;
            case "spiral":
              // Закручивается по спирали
              const angle =
                Math.atan2(btn.y - mouseY, btn.x - mouseX) + Math.PI / 4;
              const distance = 25;
              newX = Math.max(
                5,
                Math.min(95, btn.x + Math.cos(angle) * distance),
              );
              newY = Math.max(
                15,
                Math.min(85, btn.y + Math.sin(angle) * distance),
              );
              break;
            case "bounce":
              // Отскакивает от краев
              newX =
                btn.x < 50 ? Math.random() * 30 + 65 : Math.random() * 30 + 5;
              newY =
                btn.y < 50 ? Math.random() * 30 + 55 : Math.random() * 30 + 15;
              break;
          }

          return {
            ...btn,
            x: newX,
            y: newY,
            isRunning: true,
          };
        }
        return btn;
      }),
    );

    setTimeout(() => {
      setRunningButtons((prev) =>
        prev.map((btn) =>
          btn.id === buttonId ? { ...btn, isRunning: false } : btn,
        ),
      );
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Реалистичные падающие снежинки */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((snowflake) => (
          <div
            key={snowflake.id}
            className="absolute text-white transition-all duration-75 ease-linear"
            style={{
              left: `${snowflake.x}%`,
              top: `${snowflake.y}%`,
              fontSize: `${snowflake.size}rem`,
              opacity: snowflake.opacity,
              transform: `rotate(${snowflake.y * 2}deg)`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Основной контент */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Герой-секция */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Icon
              name="Snowflake"
              size={80}
              className="mx-auto text-white mb-4 animate-spin"
              style={{ animationDuration: "8s" }}
            />
          </div>
          <h1
            className="text-6xl font-bold text-white mb-6 animate-fade-in"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Зимняя Интерактивность
          </h1>
          <p
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Исследуйте мир умных анимаций! Реалистичные снежинки и кнопки с
            искусственным интеллектом создают незабываемый опыт.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            ✨ Начать исследование
          </Button>
        </div>

        {/* Интерактивные карточки */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="text-center">
              <Icon
                name="Snowflake"
                size={48}
                className="mx-auto text-blue-200 mb-4"
              />
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Физика
              </h3>
              <p
                className="text-blue-100 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Реалистичные снежинки
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="text-center">
              <Icon
                name="Zap"
                size={48}
                className="mx-auto text-yellow-200 mb-4"
              />
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ИИ
              </h3>
              <p
                className="text-blue-100 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Умные стратегии
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="text-center">
              <Icon
                name="Sparkles"
                size={48}
                className="mx-auto text-purple-200 mb-4"
              />
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Анимации
              </h3>
              <p
                className="text-blue-100 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Плавные переходы
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:rotate-1">
            <div className="text-center">
              <Icon
                name="Heart"
                size={48}
                className="mx-auto text-pink-200 mb-4"
              />
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Магия
              </h3>
              <p
                className="text-blue-100 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Wow-эффект
              </p>
            </div>
          </Card>
        </div>

        {/* Умные убегающие кнопки */}
        <div className="relative h-96 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
          <div className="absolute inset-0 p-8">
            <h2
              className="text-2xl font-bold text-white text-center mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Поймайте умные кнопки!
            </h2>
            <p
              className="text-blue-100 text-center mb-8"
              style={{ fontFamily: "Open Sans, sans-serif" }}
            >
              Каждая кнопка имеет свою стратегию побега. Попробуйте поймать их!
            </p>

            {runningButtons.map((button) => (
              <Button
                key={button.id}
                className={`absolute transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl ${
                  button.isRunning
                    ? "animate-pulse scale-110"
                    : "hover:scale-105"
                }`}
                style={{
                  left: `${button.x}%`,
                  top: `${button.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const containerRect =
                    e.currentTarget.parentElement?.getBoundingClientRect();
                  if (containerRect) {
                    const mouseX =
                      ((rect.left + rect.width / 2 - containerRect.left) /
                        containerRect.width) *
                      100;
                    const mouseY =
                      ((rect.top + rect.height / 2 - containerRect.top) /
                        containerRect.height) *
                      100;
                    handleButtonHover(button.id, mouseX, mouseY);
                  }
                }}
              >
                {button.strategy === "random" && "🎲 Рандом"}
                {button.strategy === "opposite" && "↔️ Противник"}
                {button.strategy === "spiral" && "🌀 Спираль"}
                {button.strategy === "bounce" && "⚡ Отскок"}
              </Button>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="text-center mt-16 mb-8">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                80+
              </div>
              <div
                className="text-blue-200 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Снежинок
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                5
              </div>
              <div
                className="text-blue-200 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Умных кнопок
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                4
              </div>
              <div
                className="text-blue-200 text-sm"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Стратегии ИИ
              </div>
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="text-center mt-16">
          <p
            className="text-blue-200"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Создано с ❄️ и передовыми веб-технологиями
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
