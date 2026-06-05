'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const beforeItems = [
  '수요가 줄어드는 업종에 한계를 느끼는 사장님',
  '경쟁이 과포화된 업종 사장님',
  '광고비, 리뷰경쟁, 할인경쟁이 심해지는 업종 사장님',
  '재료비는 오르는데 판매가는 못 올리는 사장님',
  '운영하는 가게가 재구매로 이어지지 않는 사장님',
  '같은 노동 강도라도 더 좋은 업종을 찾으시는 사장님',
];

const afterImpactItems = ['주문 유입', '메뉴 경쟁력', '재구매 설계'];

export default function BusinessChangeSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', amount: 0.18 });

  return (
    <section
      id="business-change"
      ref={ref}
      className="business-change-section relative isolate overflow-hidden text-[#160b04]"
    >
      <style jsx global>{`
        .business-change-word,
        .business-change-copy,
        .business-change-stat,
        .business-change-after-panel,
        .business-change-after-chip,
        .business-change-growth-badge,
        .business-change-list li {
          transition:
            color 0.3s ease,
            opacity 0.3s ease,
            transform 0.3s ease,
            text-shadow 0.3s ease,
            letter-spacing 0.3s ease,
            border-color 0.3s ease,
            background-color 0.3s ease;
        }

        .business-change-side:hover .business-change-word {
          opacity: 0.64;
          transform: translateY(-8px);
          letter-spacing: 0.025em;
          text-shadow:
            0 0 18px rgba(255, 255, 255, 0.82),
            0 10px 24px rgba(91, 34, 0, 0.18);
        }

        .business-change-side:hover .business-change-copy {
          transform: translateY(-4px);
          text-shadow:
            0 0 14px rgba(255, 255, 255, 0.9),
            0 6px 14px rgba(78, 29, 0, 0.18);
        }

        .business-change-side:hover .business-change-stat {
          transform: translateY(-5px) scale(1.03);
          text-shadow:
            0 0 22px rgba(255, 255, 255, 0.82),
            0 8px 22px rgba(110, 42, 0, 0.24);
        }

        .business-change-before:hover .business-change-list li {
          color: #3a1404;
          transform: translateX(8px);
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.9),
            0 4px 10px rgba(99, 43, 9, 0.16);
        }

        .business-change-before:hover .business-change-list li:nth-child(2n) {
          transform: translateX(14px);
        }

        .business-change-before:hover .business-change-word,
        .business-change-before:hover .business-change-copy,
        .business-change-before:hover .business-change-stat {
          color: #1b0c03;
        }

        .business-change-after:hover .business-change-copy,
        .business-change-after:hover .business-change-stat {
          color: #4b1603;
        }

        .business-change-after:hover .business-change-growth-badge {
          transform: translateY(-3px) scale(1.06) rotate(-2deg);
          box-shadow:
            0 0 22px rgba(255, 255, 255, 0.72),
            0 12px 28px rgba(120, 41, 0, 0.22);
        }

        .business-change-after:hover .business-change-after-panel {
          transform: translateY(-6px);
          background-color: rgba(255, 248, 210, 0.38);
          box-shadow:
            0 0 24px rgba(255, 255, 255, 0.38),
            0 18px 36px rgba(116, 44, 0, 0.18);
        }

        .business-change-after:hover .business-change-after-chip {
          transform: translateX(-5px);
          background-color: rgba(255, 255, 255, 0.52);
          color: #3a1404;
        }

        .business-change-after:hover .business-change-after-chip:nth-child(2) {
          transform: translateX(-10px);
        }

        .business-change-after:hover .business-change-after-chip:nth-child(3) {
          transform: translateX(-15px);
        }

        .business-change-after:hover .business-change-word {
          color: #fff7d6;
          opacity: 0.5;
          text-shadow:
            0 0 22px rgba(118, 45, 0, 0.34),
            0 8px 20px rgba(255, 255, 255, 0.18);
        }

        .business-change-center:hover .business-change-title {
          text-shadow:
            0 0 18px rgba(255, 198, 1, 0.86),
            0 10px 28px rgba(92, 32, 0, 0.18);
        }

        @media (hover: none), (max-width: 767px) {
          .business-change-side:hover .business-change-word,
          .business-change-side:hover .business-change-copy,
          .business-change-side:hover .business-change-stat,
          .business-change-after:hover .business-change-growth-badge,
          .business-change-after:hover .business-change-after-panel,
          .business-change-after:hover .business-change-after-chip,
          .business-change-after:hover .business-change-after-chip:nth-child(2),
          .business-change-after:hover .business-change-after-chip:nth-child(3),
          .business-change-before:hover .business-change-list li,
          .business-change-before:hover .business-change-list li:nth-child(2n) {
            transform: none;
            letter-spacing: 0;
            text-shadow: none;
          }

          .business-change-side:hover .business-change-word {
            opacity: 1;
          }

          .business-change-before .business-change-word {
            color: rgba(65, 30, 9, 0.66);
            font-size: clamp(1.35rem, 7.25vw, 1.82rem);
            text-shadow:
              0 1px 0 rgba(255, 246, 221, 0.72),
              0 3px 10px rgba(96, 44, 8, 0.16);
          }

          .business-change-after .business-change-word {
            color: rgba(255, 249, 224, 0.68);
            font-size: clamp(1.35rem, 7.25vw, 1.82rem);
            text-shadow:
              0 1px 0 rgba(114, 39, 0, 0.28),
              0 3px 12px rgba(255, 255, 255, 0.2);
          }

          .business-change-before:hover .business-change-word {
            color: rgba(65, 30, 9, 0.66);
            text-shadow:
              0 1px 0 rgba(255, 246, 221, 0.72),
              0 3px 10px rgba(96, 44, 8, 0.16);
          }

          .business-change-before:hover .business-change-copy,
          .business-change-after:hover .business-change-copy {
            color: inherit;
          }

          .business-change-before:hover .business-change-stat {
            color: #000;
          }

          .business-change-after:hover .business-change-word {
            color: rgba(255, 249, 224, 0.68);
            text-shadow:
              0 1px 0 rgba(114, 39, 0, 0.28),
              0 3px 12px rgba(255, 255, 255, 0.2);
          }

          .business-change-after:hover .business-change-stat {
            color: #9e260b;
          }

          .business-change-before:hover .business-change-list li {
            color: #b94b25;
          }

          .business-change-center:hover .business-change-title {
            text-shadow: none;
          }
        }
      `}</style>

      <div className=" relative mx-auto aspect-[941/1280] w-full overflow-hidden min-[390px]:aspect-[941/1210] md:aspect-[1672/941]">
        <div className="absolute inset-0 bg-[#ffc400]" aria-hidden />
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(135deg,#fff0c7_0%,#ffe3a9_48%,#ffd991_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,#ffc900_0%,#ffb000_55%,#ff9f00_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(92,45,8,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(92,45,8,0.08)_1px,transparent_1px)] bg-[size:38px_38px] opacity-55 md:bg-[size:52px_52px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_72%,rgba(255,255,255,0.28),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.22),transparent_30%,transparent_70%,rgba(107,39,0,0.12))]"
          aria-hidden
        />
        <Image
          src="/new-asset/business-change/omurice-change.webp"
          alt=""
          width={1672}
          height={941}
          sizes="(max-width: 767px) 110vw, 58vw"
          className="pointer-events-none absolute left-1/2 bottom-[5.5%] z-[5] w-[110%] max-w-none -translate-x-1/2 drop-shadow-[0_22px_34px_rgba(78,27,0,0.24)] min-[390px]:bottom-[-5%] min-[390px]:w-[108%] md:bottom-[-4.8%] md:w-[58%] md:max-w-[980px]"
          quality={92}
          priority={false}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: 'easeOut' }}
          className="business-change-center absolute left-1/2 top-[9.5%] z-20 w-[74%] -translate-x-1/2 text-center min-[390px]:w-[76%] md:top-[22%] md:w-[42%]"
        >
          <p className="business-change-title break-keep font-heading text-[clamp(1.08rem,4.9vw,1.88rem)] font-black leading-[0.98] tracking-normal text-black transition duration-300 min-[390px]:text-[clamp(1.22rem,5.3vw,2.08rem)] md:text-[clamp(2.6rem,4vw,4.4rem)] md:leading-[1.08]">
            간판만 변경하시고
            <br />
            <span className="text-[#c43912]">오므라이스</span> 하세요!
          </p>
          <p className="mt-1.5 break-keep text-[0.62rem] font-black leading-snug text-[#32190b] min-[390px]:text-[0.7rem] md:mt-4 md:text-xl">
            실제 업종 변경으로 증명한 매출 성장 사례
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -34 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
          className="business-change-side business-change-before absolute left-0 top-0 z-10 h-full w-[55%] cursor-default overflow-hidden px-3 pt-[22.5%] min-[390px]:px-4 md:w-1/2 md:overflow-visible md:px-[4.2vw] md:pt-[14%]"
        >
          <p className="business-change-word pointer-events-none absolute left-2 top-[2.6%] max-w-full overflow-hidden font-heading text-[8.4vw] font-black uppercase leading-none tracking-[-0.04em] text-[#1b0c03]/30 min-[390px]:left-3 md:left-[2.3vw] md:top-[4%] md:text-[8.2vw] md:tracking-normal md:text-white/45">
            BEFORE
          </p>
          <div className="relative z-10 mt-0 md:mt-[10%]">
            <h3 className="business-change-copy flex w-fit items-center gap-2 whitespace-nowrap border-b border-[#32190b]/50 pb-1 text-[0.82rem] font-black leading-none min-[390px]:gap-3 min-[390px]:text-[0.96rem] md:block md:pb-2 md:text-[2.1vw]">
              <span>업종변경 전</span>
              <span className="hidden h-px w-9 border-t border-dotted border-[#32190b]/55 min-[390px]:block md:hidden" />
            </h3>
            <p className="business-change-copy mt-2.5 text-[0.6rem] font-bold leading-none min-[390px]:text-[0.68rem] md:mt-6 md:text-[1.15vw]">
              월매출
            </p>
            <p className="business-change-stat mt-1 whitespace-nowrap font-heading text-[1.52rem] font-black leading-none tracking-normal text-black min-[390px]:text-[1.84rem] md:text-[4.4vw]">
              6000
              <span className="ml-1 text-[0.8rem] min-[390px]:text-[1rem] md:text-[1.85vw]">
                만원
              </span>
            </p>
            <ul className="business-change-list mt-3 space-y-1 text-[0.52rem] font-bold leading-snug text-[#9a3a19] min-[390px]:mt-4 min-[390px]:space-y-1.5 min-[390px]:text-[0.58rem] md:mt-6 md:block md:space-y-3 md:text-[1.02vw] md:leading-relaxed md:text-[#9a3a19]">
              {beforeItems.map((item, index) => (
                <li
                  key={item}
                  className={
                    index >= 4
                      ? 'hidden md:list-item'
                      : index === 3
                        ? 'max-[374px]:hidden'
                        : undefined
                  }
                >
                  # {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
          className="business-change-side business-change-after absolute right-0 top-0 z-10 h-full w-[45%] cursor-default overflow-hidden px-3 pt-[23%] text-right min-[390px]:px-4 md:w-1/2 md:overflow-visible md:px-[4.2vw] md:pt-[15%]"
        >
          <p className="business-change-word pointer-events-none absolute right-2 top-[2.6%] max-w-full overflow-hidden font-heading text-[8.4vw] font-black uppercase leading-none tracking-[-0.04em] text-[#fff7d6]/50 min-[390px]:right-3 md:right-[3vw] md:top-[4%] md:text-[8.4vw] md:tracking-normal md:text-white/30">
            AFTER
          </p>
          <div className="relative z-10 ml-auto mt-0 w-fit md:mt-[13%]">
            <h3 className="business-change-copy ml-auto w-fit whitespace-nowrap border-b border-[#32190b]/55 pb-1 text-[0.92rem] font-black leading-none min-[390px]:text-[1.04rem] md:pb-2 md:text-[2.1vw]">
              업종변경 후
            </h3>
            <p className="business-change-copy mt-3 text-[0.6rem] font-bold leading-none min-[390px]:text-[0.68rem] md:mt-6 md:text-[1.15vw]">
              월매출
            </p>
            <p className="business-change-stat mt-1 whitespace-nowrap font-heading text-[1.24rem] font-black leading-none tracking-normal text-[#9e260b] min-[390px]:text-[1.58rem] md:text-[4.2vw]">
              1억5000
              <span className="ml-1 text-[0.64rem] min-[390px]:text-[0.82rem] md:text-[1.65vw]">
                만원
              </span>
            </p>
            <div className="business-change-after-panel mt-2.5 rounded-[9px] border border-[#8e2107]/28 bg-white/24 px-2.5 py-2 text-left shadow-[0_10px_22px_rgba(97,39,0,0.12)] min-[390px]:mt-3 min-[390px]:px-3 min-[390px]:py-2.5 md:mt-6 md:w-[28vw] md:max-w-[430px] md:px-5 md:py-4">
              <div className="flex items-center justify-between gap-2">
                <p className="business-change-copy break-keep text-[0.52rem] font-black leading-tight text-[#4b1603] min-[390px]:text-[0.62rem] md:text-base">
                  전환 후 매출 구조
                </p>
                <span className="business-change-growth-badge shrink-0 rounded-full bg-[#4b1603] px-2 py-1 font-heading text-[0.52rem] font-black leading-none text-[#fec601] shadow-[0_6px_16px_rgba(80,28,0,0.2)] min-[390px]:text-[0.62rem] md:px-3 md:py-1.5 md:text-sm">
                  2.5배 성장
                </span>
              </div>
              <p className="mt-2 break-keep text-[0.52rem] font-black leading-snug text-black min-[390px]:text-[0.61rem] md:mt-3 md:text-base md:leading-relaxed">
                간판은 바꾸고,
                <br />
                주문과 재구매는 오므라이스 시스템으로 채웁니다.
              </p>
              <div className="mt-2 grid gap-1 min-[390px]:mt-3 md:grid-cols-3 md:gap-2">
                {afterImpactItems.map((item) => (
                  <span
                    key={item}
                    className="business-change-after-chip rounded-full border border-[#7d2607]/22 bg-white/30 px-2 py-1 text-center text-[0.5rem] font-black leading-none text-[#6f2309] min-[390px]:text-[0.58rem] md:px-3 md:py-2 md:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
