'use client'

export default function LandingContent() {
  return (
    <>
      {/* MODAL POPUP */}
      <div className="modal-backdrop" id="modal">
        <div className="modal-box">
          <button className="modal-close" id="modalClose">×</button>
          <div className="modal-icon">⚠️</div>
          <h2>Atenção: <span className="gold">Preço promocional</span></h2>
          <p>Este valor de <strong>R$ 199,00</strong> é válido apenas até <strong>01 de Agosto de 2026</strong>.</p>
          <p>Após essa data, o preço volta para <strong>R$ 397,00</strong> — sem exceção.</p>
          <div className="modal-highlight">
            <p>🎯 Acesso ao workshop completo + Evento ao-vivo gratuito</p>
          </div>
          <a href="#" className="modal-btn" id="modalCta">
            <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            QUERO GARANTIR MINHA VAGA
          </a>
          <p className="modal-note">Pagamento único. Acesso imediato. Sem mensalidade.</p>
        </div>
      </div>

      {/* HEADER */}
      <header>
        <div className="header-inner">
          <div className="logo">Sucesso <span>&</span> Mentalidade Financeira</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="header-badge">R$ 199,00</div>
            <a href="/login" className="header-login">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              Login
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Workshop Completo — Gravação Profissional</div>
          <h1>Descubra por que seu dinheiro <span className="gold">SEMPRE</span> desaparece</h1>
          <p className="hero-subtitle">Você não tem um problema de competência financeira. Você tem um problema de arquitetura mental — e a ciência explica exatamente porquê.</p>
          <div className="hero-price">
            <div className="old">De R$ 397,00</div>
            <div className="new">Por apenas R$ 199,00</div>
            <div className="pix">ou 12x de R$ 19,90 no cartão</div>
          </div>
          <button className="cta-btn" id="ctaMain">
            QUERO ME INSCREVER AGORA
            <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
        <div className="hero-scroll">Role para saber mais</div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-item reveal">
          <span className="stat-number">5h+</span>
          <span className="stat-label">de conteúdo gravado</span>
        </div>
        <div className="stat-item reveal reveal-delay-1">
          <span className="stat-number">4</span>
          <span className="stat-label">Arquétipos de bloqueio</span>
        </div>
        <div className="stat-item reveal reveal-delay-2">
          <span className="stat-number">-13</span>
          <span className="stat-label">pontos de QI com estresse</span>
        </div>
      </div>

      {/* PAIN */}
      <section className="section pain-section">
        <div className="reveal" style={{ maxWidth: '700px' }}>
          <span className="section-tag">O Problema</span>
          <h2 className="section-title">Você já parou para pensar por que o dinheiro <span className="gold">SEMPRE</span> some?</h2>
          <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8', marginTop: '8px' }}>
            Não é falta de esforço. Não é falta de disciplina. A ciência mostra que existe uma infraestrutura invisível controlando o seu relacionamento com o dinheiro — e você nem desconfia.
          </p>
        </div>
        <div className="pain-grid">
          {[
            { icon: '💸', title: 'Dinheiro evapora', text: 'Você recebe, planeja, mas no final do mês não sabe onde foi o dinheiro. Isso não é azar. É padrão. É o seu cérebro funcionando no automático. Seu cérebro está programado para eliminar tudo que exceda seu pivô financeiro.' },
            { icon: '🧠', title: 'Estresse reduz seu QI', text: 'Estresse financeiro crônico não é só um sentimento — ele reduz sua função cognitiva em até 13 pontos de QI. Você fica mais limitado justamente quando mais precisa pensar com clareza.' },
            { icon: '🔁', title: 'Rodа de ratos infinita', text: 'Quanto mais você mergulha no desespero financeiro, mais seu cérebro trava. As ideias evaporam, o planejamento some, e você fica completamente imobilizado.' },
            { icon: '🚫', title: 'Bloqueio inconsciente', text: 'Roteiros inconscientes, traumas somatizados e padrões gravados no sistema nervoso autônomo ditam sua capacidade de gerar e reter riqueza. Não é mentalização vazia. É neurociência.' },
            { icon: '⚖️', title: 'Medo do dinheiro', text: 'Você sobrevive com o dinheiro que tem — e teme qualquer mudança que ultrapasse esse patamar. A ideia de ganhar mais gera desconforto, não vontade de agir. É o pivô financeiro funcionando — e trabalhando contra você.' },
            { icon: '📉', title: 'Confunde pobreza com simplicidade', text: 'Pobreza e simplicidade não são a mesma coisa. Mas quando você olha para quem tem menos e chama de "simples", está treinando sua mente a rejeitar a prosperidade. A prosperidade não vai chegar se você tratar riqueza como se fosse inimiga.' },
          ].map((card, i) => (
            <div key={i} className={`pain-card reveal reveal-delay-${i + 1}`}>
              <div className="pain-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-block reveal">
        <p className="quote-text">"O fenômeno do bloqueio financeiro humano transcende a mera ausência de competência técnica em contabilidade ou gestão de ativos. A evidência científica atual demonstra que a relação do indivíduo com o capital é governada por uma infraestrutura biopsicológica complexa."</p>
        <span className="quote-source">— Pesquisa em Neurociência Financeira</span>
      </div>

      {/* WHAT IS */}
      <section className="section what-section">
        <div className="reveal">
          <span className="section-tag">O Que Você Vai Receber</span>
          <h2 className="section-title">5 horas de treinamento prático com <span className="gold">base científica</span></h2>
        </div>
        <div className="what-grid">
          <div className="reveal">
            <ul className="what-list">
              {[
                { title: 'Cálculo do seu Pivô Financeiro', desc: 'Descubra exatamente qual é o número que está travando sua vida — e como expandir esse número de forma consciente' },
                { title: 'Teste Clons Money Script (32 itens)', desc: 'Diagnóstico científico com 4 categorias de avaliação, usando escala de 1 a 6 para cada afirmação' },
                { title: 'Identificação do seu Arquétipo', desc: '4 perfis de bloqueio financeiro — cada um com seu bloqueio específico e a cura correspondente' },
                { title: 'Regulação do Sistema Nervoso', desc: 'Técnicas para ativar o sistema nervoso antes de tomar decisões financeiras importantes' },
                { title: 'Reestruturação de Crenças', desc: 'Estratégias práticas para enfraquecer os padrões que te impedem de construir prosperidade real' },
                { title: 'Framework de Precificação', desc: 'Como cobrar o valor justo pelo seu trabalho — e fazer as pessoas respeitarem seu preço' },
              ].map((item, i) => (
                <li key={i}>
                  <span className="check">✓</span>
                  <span className="text">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="what-image reveal reveal-delay-2">
            <div className="what-image-inner">
              <div className="big-num">5<sub>h+</sub></div>
              <p>de conteúdo transformador</p>
              <div className="what-image-divider"></div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--white)' }}>+ Evento ao-vivo gratuito</div>
              <div className="access-tag">Acesso Imediato</div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="section science-section">
        <div className="science-center reveal">
          <span className="section-tag">Base Científica</span>
          <h2 className="section-title">Não é motivação. <span className="gold">É neurociência.</span></h2>
          <p style={{ color: '#555', fontSize: '0.98rem', lineHeight: '1.8' }}>Este treinamento não usa achismo. Cada conceito é fundamentado em pesquisa — do estresse crónico à arquitetura do sistema nervoso autônomo.</p>
        </div>
        <div className="science-cards">
          {[
            { icon: '🧬', title: 'Infraestrutura Biopsicológica', desc: 'Seus padrões financeiros não são escolhas racionais — são rotas neurais instaladas ao longo de décadas de condicionamento familiar e experiências acumuladas. Você não escolheu esses padrões. Você os herdou.' },
            { icon: '⚡', title: 'Sistema Nervoso Autônomo', desc: 'Seus padrões com dinheiro estão gravados no sistema que você não controla conscientemente. Mudá-los exige estratégia estruturada, não só força de vontade.' },
            { icon: '📉', title: 'Estresse Crônico = Menor QI', desc: 'Estresse financeiro persistente literalmente reduz sua capacidade cognitiva em até 13 pontos — e isso te impede ainda mais de sair do ciclo vicioso.' },
          ].map((card, i) => (
            <div key={i} className={`science-card reveal reveal-delay-${i + 1}`}>
              <div className="science-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARCHETYPES */}
      <section className="arch-section">
        <div className="arch-center reveal">
          <span className="section-tag">Os 4 Arquétipos</span>
          <h2 className="section-title">Você se identifica com <span className="gold">algum deles?</span></h2>
          <p>Cada arquétipo tem um bloqueio e uma cura específica. Conhecê-los é o primeiro passo para a transformação real.</p>
        </div>
        <div className="arch-grid">
          {[
            { num: '01', title: 'O Guardião do Sacrifício', desc: 'Quer prosperidade, mas se sente culpado de usufruir daquilo que conquistou com seu próprio trabalho. Você acaba se sentindo limitado no crescimento por se comparar com quem não se esforçou tanto quanto você para enriquecer e prosperar.' },
            { num: '02', title: 'O Desconfortável com Abundância', desc: 'Quando o dinheiro aumenta, algo interno te faz destruir ou recusar o que entrou. Você empurra a prosperidade para longe. Medo de se transformar em alguém arrogante, prepotente ou diferente de quem você é.' },
            { num: '03', title: 'O Evaporador Crônico', desc: 'Dinheiro entra e some sem rastro. Você nem sente onde foi gasto. Ele simplesmente desaparece. Como vapor. Seu pivô financeiro é quase zero — a quantidade mínima que seu cérebro aceita reter.' },
            { num: '04', title: 'O Desvalorizado', desc: 'Não cobra o valor justo pelo seu trabalho. Oferece desconto para amigo, preço baixo para todo mundo. E enquanto você faz isso, quem não valoriza o próprio trabalho é quem prospera.' },
          ].map((card, i) => (
            <div key={i} className={`arch-card reveal reveal-delay-${i + 1}`}>
              <div className="arch-num">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testi-section">
        <div className="testi-center reveal">
          <span className="section-tag">Depoimentos</span>
          <h2 className="section-title">O que dizem <span className="gold">quem já participou</span></h2>
        </div>
        <div className="testi-grid">
          {[
            { quote: '"Eu era a pessoa que recebia o salário e no dia 10 não sabia mais onde tinha ido o dinheiro. Descobri que meu pivô era R$ 2,83. Agora sei exatamente onde começar."', name: 'Maria do Carmo', role: 'Psicoterapeuta', initial: 'M' },
            { quote: '"Achava que precisava ser mais \'espiritual\' para merecer dinheiro. Mas o dinheiro não tem personalidade. É só uma ferramenta. Isso me libertou de verdade."', name: 'Roberto', role: 'Terapeuta Sistêmico', initial: 'R' },
            { quote: '"Eu nunca conseguia guardar dinheiro. Fiz o teste e descobri que sou o arquétipo do evaporador. A partir do momento que eu entendi isso, já comecei a mudar."', name: 'Patrícia', role: 'Coach de Carreira', initial: 'P' },
          ].map((t, i) => (
            <div key={i} className={`testi-card reveal reveal-delay-${i + 1}`}>
              <div className="testi-quote">"</div>
              <p>{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">
                  <span>{t.initial}</span>
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section">
        <div className="cta-content reveal">
          <span className="section-tag">Última chance</span>
          <h2 className="section-title" style={{ marginTop: '8px' }}>Sua mente é o maior ativo financeiro que você tem</h2>
          <p className="section-desc">Este workshop não vai te dar uma fórmula mágica. Vai te dar algo muito mais poderoso: consciência de por que você se comporta assim com dinheiro — e ferramentas concretas para mudar isso.</p>
          <div className="cta-final-price">
            <span className="old">De R$ 397,00</span>
            <span className="new">R$ 199,00</span>
            <span className="pix">ou 12x de R$ 19,90 no cartão</span>
          </div>
          <button className="cta-btn-large" id="ctaFinal">
            <svg viewBox="0 0 24 24" fill="#25D366" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            GARANTIR MINHA VAGA AGORA
          </button>
          <p className="cta-note">Acesso imediato após confirmação de pagamento. Não há mensalidade — pagamento único.<br />+ Evento ao-vivo gratuito incluso</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p><span className="gold">Sucesso e Mentalidade Financeira</span> — Todos os direitos reservados.</p>
        <p style={{ marginTop: '8px' }}>Este produto não substitui acompanhamento terapêutico ou orientação financeira profissional.</p>
      </footer>

      {/* MOBILE WHATSAPP BAR */}
      <div className="whatsapp-bar">
        <a href="#" id="ctaMobile">
          <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          GARANTIR MINHA VAGA — R$ 199,00
        </a>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        const whatsappLink = 'https://chat.whatsapp.com/EG043BDH6t48XHP8dWmX0L?mode=gi_t';
        function openWhatsApp(e) {
          e.preventDefault();
          document.getElementById('modal').classList.add('active');
        }
        document.getElementById('ctaMain')?.addEventListener('click', openWhatsApp);
        document.getElementById('ctaFinal')?.addEventListener('click', openWhatsApp);
        document.getElementById('ctaMobile')?.addEventListener('click', openWhatsApp);
        document.getElementById('modalCta')?.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = whatsappLink;
        });
        document.getElementById('modalClose')?.addEventListener('click', function() {
          document.getElementById('modal').classList.remove('active');
        });
        document.getElementById('modal')?.addEventListener('click', function(e) {
          if (e.target === this) this.classList.remove('active');
        });
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));
      ` }} />
    </>
  )
}