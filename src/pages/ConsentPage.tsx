import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoriesFilter from "@/components/home/CategoriesFilter";

const ConsentPage = () => {
  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden relative">
      <div className="aurora-glow" aria-hidden="true" />
      <Header />
      <CategoriesFilter />
      <main>
        <section className="content-container pt-[40px] md:pt-[80px] pb-[40px] md:pb-[60px]">
          <h1 className="font-semibold text-[36px] md:text-[56px] leading-[1.1] tracking-[-1px] text-azure-4 m-0">
            Согласие на обработку персональных данных
          </h1>
        </section>

        <section className="content-container pb-[60px] md:pb-[100px]">
          <div className="max-w-[800px] flex flex-col gap-[40px] md:gap-[56px]">

            <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
              Настоящим в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
              данных» я, пользователь сайта{" "}
              <a href="https://piestarter.lovable.app/" className="text-cyan-2 hover:underline">
                https://piestarter.lovable.app/
              </a>{" "}
              (далее – Сайт), свободно, своей волей и в своем интересе даю согласие АО «Холдинг
              Кронос» (ИНН/ОГРН: 9726025555/1227700696871, адрес: 108842, г. Москва, вн. тер. г.
              городской округ Троицк, г Троицк, ул. Нагорная, д. 8, помещ. 12/11/12/13), (далее –
              Оператор) на обработку моих персональных данных на следующих условиях:
            </p>

            {/* Section 1 */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-semibold text-[20px] md:text-[24px] leading-[1.3] text-azure-4 m-0">
                1. Персональные данные, на обработку которых дается согласие
              </h2>
              <div className="flex flex-col gap-[12px]">
                <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                  1.1. Данные, которые я добровольно указываю в формах на Сайте: фамилия, имя,
                  отчество; адрес электронной почты (e-mail); номер контактного телефона.
                </p>
                <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                  1.2. Данные, которые автоматически передаются Оператору при использовании Сайта с
                  помощью установленного на моем устройстве программного обеспечения: IP-адрес; данные
                  о местоположении; тип браузера и операционной системы; сведения о посещенных
                  страницах и времени использования Сайта; источник перехода на Сайт; файлы cookie.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-semibold text-[20px] md:text-[24px] leading-[1.3] text-azure-4 m-0">
                2. Цели обработки персональных данных
              </h2>
              <div className="flex flex-col gap-[12px]">
                <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                  Я даю согласие на обработку моих персональных данных в следующих целях:
                </p>
                <ul className="flex flex-col gap-[10px] pl-[20px] m-0">
                  <li className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7]">
                    Предоставление мне доступа к информации об инвестиционных продуктах, размещенных
                    на Сайте (ЗПИФН «Активо Флиппинг»).
                  </li>
                  <li className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7]">
                    Направление мне запрошенных аналитических материалов, новостей и событий из сферы
                    коллективных инвестиций в коммерческую недвижимость.
                  </li>
                  <li className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7]">
                    Связь со мной для обработки моих запросов и заявок, включая уточнение деталей по
                    телефону или электронной почте.
                  </li>
                  <li className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7]">
                    Проведение статистических исследований и анализа интересов аудитории для улучшения
                    работы Сайта и персонализации контента (например, отображение релевантной
                    информации на карте «Инвестиционная температура»).
                  </li>
                  <li className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7]">
                    Направление информационных и рекламных материалов об инвестиционных возможностях и
                    услугах Оператора (при условии проставления мной отдельной отметки).
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-semibold text-[20px] md:text-[24px] leading-[1.3] text-azure-4 m-0">
                3. Способы обработки персональных данных
              </h2>
              <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                Я даю согласие на смешанную (с использованием средств автоматизации и без
                использования таких средств) обработку моих персональных данных, включая сбор,
                запись, систематизацию, накопление, хранение, уточнение (обновление, изменение),
                извлечение, использование, передачу (предоставление доступа), обезличивание,
                блокирование, удаление, уничтожение.
              </p>
            </div>

            {/* Section 4 */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-semibold text-[20px] md:text-[24px] leading-[1.3] text-azure-4 m-0">
                4. Передача персональных данных третьим лицам
              </h2>
              <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                Я согласен на передачу моих персональных данных третьим лицам, с которыми Оператор
                сотрудничает для достижения целей обработки (хостинг-провайдеры, сервисы
                email-рассылок, аналитические системы), при условии обеспечения такими лицами
                конфиденциальности персональных данных.
              </p>
            </div>

            {/* Section 5 */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-semibold text-[20px] md:text-[24px] leading-[1.3] text-azure-4 m-0">
                5. Срок действия согласия и порядок отзыва
              </h2>
              <div className="flex flex-col gap-[12px]">
                <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                  5.1. Настоящее согласие действует в течение 5 (пяти) лет с момента его
                  предоставления, либо до момента его отзыва мной.
                </p>
                <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                  5.2. Я проинформирован о возможности отзыва настоящего согласия в любое время на
                  основании моего письменного заявления, направленного в адрес Оператора заказным
                  письмом с уведомлением о вручении либо путем направления электронного письма по
                  адресу:{" "}
                  <a href="mailto:hi@piestarter.ru" className="text-cyan-2 hover:underline">
                    hi@piestarter.ru
                  </a>{" "}
                  с пометкой «Отзыв согласия на обработку персональных данных».
                </p>
                <p className="text-[15px] md:text-[16px] text-grey-71 leading-[1.7] m-0">
                  5.3. Я подтверждаю, что, нажимая кнопку «Отправить» / «Подписаться» (или
                  аналогичную) и/или продолжая использование Сайта, я выражаю свое полное и
                  безоговорочное согласие с условиями настоящего документа.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConsentPage;
