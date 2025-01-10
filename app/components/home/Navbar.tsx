import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
    handleNavClick: any,
    setCursorVariant: any,
    scrolled: any,
}

export const Navbar: React.FC<NavbarProps> = ({handleNavClick, setCursorVariant, scrolled}) => {
    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled
            ? 'p-4 md:py-4 bg-[#0D0D15]/90 backdrop-blur-md'
            : 'p-4 md:p-6 mix-blend-difference'
          }`}>
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="text-base md:text-xl tracking-[0.2em] md:tracking-[0.3em] font-light whitespace-nowrap bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
              CYRIL
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-12 tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm">
              {['overview', 'timeline', 'lab'].map((item) => (
                <MagneticButton className="" key={item}>
                  <a
                    href={`#${item}`}
                    onClick={(e) => handleNavClick(e, item)}
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                    className="hover:text-[#BE95FF] transition-colors duration-300 cursor-pointer uppercase"
                  >
                    {item}
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </nav>
    )
}