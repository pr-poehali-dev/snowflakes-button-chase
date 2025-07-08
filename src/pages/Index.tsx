import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [snowflakes, setSnowflakes] = useState<
    Array<{ id: number; x: number; speed: number; size: number }>
  >([]);
  const [runningButtons, setRunningButtons] = useState<
    Array<{ id: number; x: number; y: number; isRunning: boolean }>
  >([]);

  // Генерация снежинок
  useEffect(() => {
    const generateSnowflakes = () => {
      const newSnowflakes = [];
      for (let i = 0; i < 50; i++) {
        newSnowflakes.push({
          id: i,
          x: Math.random() * 100,
          speed: Math.random() * 3 + 1,
          size: Math.random() * 0.8 + 0.2,
        });
      }
      setSnowflakes(newSnowflakes);
    };
    generateSnowflakes();
  }, []);

  // Инициализация убегающих кнопок
  useEffect(() => {
    const initialButtons = [
      { id: 1, x: 20, y: 60, isRunning: false },
      { id: 2, x: 80, y: 40, isRunning: false },
      { id: 3, x: 50, y: 80, isRunning: false },
      { id: 4, x: 30, y: 30, isRunning: false },
    ];
    setRunningButtons(initialButtons);
  }, []);

  const handleButtonHover = (buttonId: number) => {
    setRunningButtons((prev) =>
      prev.map((btn) => {
        if (btn.id === buttonId) {
          return {
            ...btn,
            x: Math.random() * 70 + 10,
            y: Math.random() * 70 + 10,
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
    }, 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      {/* Падающие снежинки */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map((snowflake) => (
          <div
            key={snowflake.id}
            className="absolute text-white opacity-80 animate-bounce"
            style={{
              left: `${snowflake.x}%`,
              fontSize: `${snowflake.size}rem`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + snowflake.speed}s`,
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
              className="mx-auto text-white mb-4"
            />
          </div>
          <h1
            className="text-6xl font-bold text-white mb-6 animate-fade-in"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Зимняя Магия
          </h1>
          <p
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Добро пожаловать в мир интерактивных анимаций! Попробуйте поймать
            убегающие кнопки под падающими снежинками.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Начать приключение
          </Button>
        </div>

        {/* Интерактивные карточки */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <Icon
                name="Sparkles"
                size={48}
                className="mx-auto text-white mb-4"
              />
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Анимации
              </h3>
              <p
                className="text-blue-100"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Плавные переходы и эффекты
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <Icon name="Zap" size={48} className="mx-auto text-white mb-4" />
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Интерактивность
              </h3>
              <p
                className="text-blue-100"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Отзывчивые элементы интерфейса
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <Icon
                name="Heart"
                size={48}
                className="mx-auto text-white mb-4"
              />
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Магия
              </h3>
              <p
                className="text-blue-100"
                style={{ fontFamily: "Open Sans, sans-serif" }}
              >
                Незабываемые впечатления
              </p>
            </div>
          </Card>
        </div>

        {/* Убегающие кнопки */}
        <div className="relative h-96 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
          <div className="absolute inset-0 p-8">
            <h2
              className="text-2xl font-bold text-white text-center mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Поймайте убегающие кнопки!
            </h2>
            <p
              className="text-blue-100 text-center mb-8"
              style={{ fontFamily: "Open Sans, sans-serif" }}
            >
              Наведите мышь на кнопки — они будут убегать!
            </p>

            {runningButtons.map((button) => (
              <Button
                key={button.id}
                className={`absolute transition-all duration-300 bg-white/20 hover:bg-white/30 text-white border border-white/30 ${
                  button.isRunning ? "animate-pulse" : ""
                }`}
                style={{
                  left: `${button.x}%`,
                  top: `${button.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => handleButtonHover(button.id)}
              >
                Поймай меня!
              </Button>
            ))}
          </div>
        </div>

        {/* Футер */}
        <div className="text-center mt-16">
          <p
            className="text-blue-200"
            style={{ fontFamily: "Open Sans, sans-serif" }}
          >
            Создано с ❄️ и интерактивными технологиями
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
